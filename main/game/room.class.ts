/* tslint:disable:max-line-length */
import {
    Character, Record, RecordCreator, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface RoomCreator {
    name: string;
    width: number;
    height: number;
}

export interface RoomModel extends RecordCreator {
    name: string;
    width: number;
    height: number;

    // references
}

export interface RoomInstanceCreator extends RoomCreator, RecordCreator { }

export class Room extends Record implements RoomCreator {

    public static async create(creator: RoomCreator) {
        let model = await sails.models.room.create({
            name: creator.name,
            width: creator.width,
            height: creator.height,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Room(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: RoomModel) {
        return new Room(creator);
    }

    private static $array: Room[] = [];
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

    private $width: number;
    public get width() {
        return this.$width;
    }
    public set width(value) {
        this.$width = value;
    }

    private $height: number;
    public get height() {
        return this.$height;
    }
    public set height(value) {
        this.$height = value;
    }

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
            width: this.width,
            height: this.height,
            // references
        };
    }

    // references

    // two way
    private $characters: Character[] = [];
    public get characters() {
        return this.$characters;
    }
    public set characters(value) {
        this.$characters = value;
    }

    private constructor(creator: RoomInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.name = creator.name;
        this.width = creator.width;
        this.height = creator.height;

        // references

        // two way
        // this.characters = creator.characters;
        // _.each(creator.characters, (character) => {
        //     character.room = this;
        // });

        // adding to extension
        Room.array.push(this);
    }
}
