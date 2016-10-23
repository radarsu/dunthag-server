/* tslint:disable:max-line-length */
import {
    Character, Controller, ControllerAction, CreateCharacterInterface, Logger, Schema, Stat, User, _, createCharacterSchema, game,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

declare let sails: any;

let log = new Logger(`character.controller`);

let create = new ControllerAction<CreateCharacterInterface>(
    log.child(`create`),
    createCharacterSchema,
    async (req, res, socket, thisLog, body) => {
        let character = _.find(game.characters, (current) => {
            return current.name.toLowerCase() === body.name.toLowerCase();
        });

        if (character) {
            throw new Error(`character ${body.name} already exists`);
        }

        let race = _.find(game.races, (item) => {
            return item.code === body.race;
        });

        if (!race) {
            throw new Error(`chosen race does not exist in server`);
        }

        let sex = _.find(game.sexes, (item) => {
            return item.code === body.sex;
        });

        if (!sex) {
            throw new Error(`chosen sex does not exist in server`);
        }

        // validating stats
        let raceSexStats = {
            str: _.find(race.raceStats, (raceStat) => {
                return raceStat.statScheme.code === "str" && raceStat.sex.code === sex.code;
            }).value,
            agi: _.find(race.raceStats, (raceStat) => {
                return raceStat.statScheme.code === "agi" && raceStat.sex.code === sex.code;
            }).value,
            int: _.find(race.raceStats, (raceStat) => {
                return raceStat.statScheme.code === "int" && raceStat.sex.code === sex.code;
            }).value,
            free: _.find(race.raceStats, (raceStat) => {
                return raceStat.statScheme.code === "free" && raceStat.sex.code === sex.code;
            }).value,
        };

        // free must equal 0
        if (body.stats.free !== 0) {
            throw new Error(`you must spend all free points`);
        }

        _.forOwn(raceSexStats, (value: number, code: string) => {
            // ignore free
            if (code === "free") {
                return;
            }

            // too low stat
            if (body.stats[code] < value) {
                throw new Error(`${code} value is too low for ur race and sex`);
            }

            // too high stat
            if (body.stats[code] > value + raceSexStats.free) {
                throw new Error(`${code} value is too high for ur race and sex`);
            }
        });

        // too much stats
        let sum = 0;

        _.forOwn(body.stats, (value, name) => {
            sum += value;
        });

        if (sum !== 30) {
            throw new Error(`you have spent ${sum} stat points instead 30`);
        }

        let characterCreator = {
            description: "",
            name: body.name,
            race: race,
            room: game.rooms[0],
            sex: sex,
            user: <User>socket.user,
            x: 0,
            y: 0,
            hasAvatar: false,
        };

        let created = await Character.create(characterCreator);

        let statsAdd: Promise<any>[] = [];
        _.each(game.statSchemes, (statScheme) => {
            statsAdd.push(Stat.create({
                character: created.instance,
                statScheme: statScheme,
                value: body.stats[statScheme.code],
            }));
        });

        await Promise.all(statsAdd);

        socket.toastr({
            message: `character created`,
            type: "success",
        });
        socket.path(`/user/${(<User>socket.user).login}`);
    }
);


let login = new ControllerAction<{
    character: string;
}>(
    log.child(`login`),
    new Schema<{
        character: string;
    }>({
        properties: {
            character: {
                type: "string",
            },
        },
    }),
    async (req, res, socket, thisLog, body) => {

        let user = <User>socket.user;

        let character = _.find(user.characters, (item) => {
            return item.id === body.character;
        });

        if (!character) {
            throw new Error(`you do not have character ${body.character}`);
        }

        log.debug(`character`, `${character.name} has logged in.`);
        user.character = character;
        socket.path(`/user/${user.login}/character/${character.name}`);
    });

let self = new ControllerAction<{}>(
    log.child(`self`),
    new Schema({}),
    async (req, res, socket, thisLog, body) => {
        let model = await sails.models.character.findOne({
            id: (<Character>(<User>socket.user).character).id
        }).populateAll();

        if (!model) {
            throw new Error(`you are not logged in as character`);
        }

        res.ok(model);
    });

let controller: Controller = {
    create: (req, res) => create.init(req, res),
    login: (req, res) => login.init(req, res),
    self: (req, res) => self.init(req, res),
    // action: all skills, messages, everything, even stats and description modification
};

module.exports = controller;
