/* tslint:disable:max-line-length */
import {
    Race, Record, RecordCreator, Room, Sex, Stat, User, _, game,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface CharacterCreator {
    name: string;
    description: string;
    x: number;
    y: number;
    exp: number;
    hasAvatar: boolean;

    // references
    race: Race;
    sex: Sex;
    room: Room;
    user: User;
}

export interface CharacterModel extends RecordCreator {
    name: string;
    description: string;
    x: number;
    y: number;
    exp: number;
    hasAvatar: boolean;

    // references
    race: string;
    sex: string;
    room: string;
    user: string;
}

export interface CharacterInstanceCreator extends CharacterCreator, RecordCreator { }

export class Character extends Record implements CharacterCreator {

    public static async create(creator: CharacterCreator) {
        let model = await sails.models.character.create({
            name: creator.name,
            description: creator.description,
            x: creator.x,
            y: creator.y,
            hasAvatar: creator.hasAvatar,

            race: creator.race.id,
            sex: creator.sex.id,
            room: creator.room.id,
            user: creator.user.id,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Character(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: CharacterModel) {
        let race = _.find(game.races, (item) => {
            return item.id === creator.race;
        });

        let sex = _.find(game.sexes, (item) => {
            return item.id === creator.sex;
        });

        let room = _.find(game.rooms, (item) => {
            return item.id === creator.room;
        });

        let user = _.find(game.users, (item) => {
            return item.id === creator.user;
        });

        let instanceCreator = _.assign(creator, {
            race: race,
            sex: sex,
            room: room,
            user: user,
        });

        return new Character(instanceCreator);
    }

    private static $array: Character[] = [];
    public static get array() {
        return this.$array;
    }

    // attributes
    private $name: string;
    public get name() {
        return this.$name;
    }
    public set name(value) {
        this.$name = value;
    }

    private $description: string;
    public get description() {
        return this.$description;
    }
    public set description(value) {
        this.$description = value;
    }

    private $x: number;
    public get x() {
        return this.$x;
    }
    public set x(value) {
        this.$x = value;
    }

    private $y: number;
    public get y() {
        return this.$y;
    }
    public set y(value) {
        this.$y = value;
    }

    private $exp: number;
    public get exp() {
        return this.$exp;
    }
    public set exp(value) {
        this.$exp = value;
    }

    private $hasAvatar: boolean;
    public get hasAvatar() {
        return this.$hasAvatar;
    }
    public set hasAvatar(value) {
        this.$hasAvatar = value;
    }

    // additional
    // additional
    get model() {
        return _.assign(this.saveModel, {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }

    get saveModel() {
        return {
            name: this.name,
            description: this.description,
            x: this.x,
            y: this.y,
            // references
            race: this.race.id,
            sex: this.sex.id,
            room: this.room.id,
            user: this.user.id,
        };
    }

    // references
    private $race: Race;
    public get race() {
        return this.$race;
    }
    public set race(value) {
        this.$race = value;
    }

    private $sex: Sex;
    public get sex() {
        return this.$sex;
    }
    public set sex(value) {
        this.$sex = value;
    }

    // two way
    private $room: Room;
    public get room() {
        return this.$room;
    }
    public set room(value) {
        this.$room = value;
    }

    private $stats: Stat[] = [];
    public get stats() {
        return this.$stats;
    }
    public set stats(value) {
        this.$stats = value;
    }

    private $user: User;
    public get user() {
        return this.$user;
    }
    public set user(value) {
        this.$user = value;
    }

    private constructor(creator: CharacterInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.name = creator.name;
        this.description = creator.description;
        this.x = creator.x;
        this.y = creator.y;

        // references

        // one way
        this.race = creator.race;
        this.sex = creator.sex;

        // two way
        this.room = creator.room;
        creator.room.characters.push(this);

        // this.stats = creator.stats;
        // _.each(creator.stats, (stat) => {
        //     stat.character = this;
        // });

        this.user = creator.user;
        creator.user.characters.push(this);

        // adding to extension
        Character.array.push(this);
    }
}
