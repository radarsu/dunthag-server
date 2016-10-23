/* tslint:disable:max-line-length */
import {
    Character, CharacterModel, Game, Logger, Race, RaceModel, RaceStat, RaceStatModel, Room, RoomModel, Sex, SexModel, Stat, StatModel, StatScheme, StatSchemeModel, User, UserModel, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

let log = new Logger(`db-loader`);

export let game = new Game(`Dunthag`);

export let dbLoader = {
    ready: async () => {

        let statSchemes: StatSchemeModel[] = await sails.models.statscheme.find();
        let races: RaceModel[] = await sails.models.race.find();
        let sexes: SexModel[] = await sails.models.sex.find();
        let raceStats: RaceStatModel[] = await sails.models.racestat.find();

        let users: UserModel[] = await sails.models.user.find();
        let rooms: RoomModel[] = await sails.models.room.find();
        let characters: CharacterModel[] = await sails.models.character.find();
        let stats: StatModel[] = await sails.models.stat.find();

        _.each(statSchemes, (model) => {
            StatScheme.load(model);
        });

        _.each(races, (model) => {
            Race.load(model);
        });

        _.each(sexes, (model) => {
            Sex.load(model);
        });

        _.each(raceStats, (model) => {
            RaceStat.load(model);
        });

        _.each(users, (model) => {
            User.load(model);
        });

        _.each(rooms, (model) => {
            Room.load(model);
        });

        _.each(characters, (model) => {
            Character.load(model);
        });

        _.each(stats, (model) => {
            Stat.load(model);
        });

        log.debug(`Database data loaded`);
    },
};
