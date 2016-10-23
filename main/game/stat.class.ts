/* tslint:disable:max-line-length */
import {
    Character, Record, RecordCreator, StatScheme, _, game,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface StatCreator {
    value: number;

    // references
    character: Character;
    statScheme: StatScheme;
}

export interface StatModel extends RecordCreator {
    value: number;

    // references
    character: string;
    statScheme: string;
}

export interface StatInstanceCreator extends StatCreator, RecordCreator { }

export class Stat extends Record implements StatCreator {

    public static async create(creator: StatCreator) {
        let model = await sails.models.stat.create({
            value: creator.value,

            character: creator.character.id,
            statScheme: creator.statScheme.id,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Stat(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: StatModel) {
        let character = _.find(game.characters, (item) => {
            return item.id === creator.character;
        });

        let statScheme = _.find(game.statSchemes, (item) => {
            return item.id === creator.statScheme;
        });

        let instanceCreator = _.assign(creator, {
            character: character,
            statScheme: statScheme,
        });

        return new Stat(instanceCreator);
    }


    private static $array: Stat[] = [];
    public static get array() {
        return this.$array;
    }

    // attributes
    private $value: number;
    public get value() {
        return this.$value;
    }
    public set value(value) {
        this.$value = value;
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
            value: this.value,
            // references
            character: this.character.id,
            statScheme: this.statScheme.id,
        };
    }

    // references
    private $character: Character;
    public get character() {
        return this.$character;
    }
    public set character(value) {
        this.$character = value;
    }

    private $statScheme: StatScheme;
    public get statScheme() {
        return this.$statScheme;
    }
    public set statScheme(value) {
        this.$statScheme = value;
    }

    private constructor(creator: StatInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.value = creator.value;

        // references

        // one way
        this.statScheme = creator.statScheme;

        // two way
        this.character = creator.character;
        creator.character.stats.push(this);

        // adding to extension
        Stat.array.push(this);
    }
}
