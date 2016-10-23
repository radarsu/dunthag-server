/* tslint:disable:max-line-length */
import {
    Record, RecordCreator, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface StatSchemeCreator {
    code: string;
    name: string;
}

export interface StatSchemeModel extends RecordCreator {
    code: string;
    name: string;
}

export interface StatSchemeInstanceCreator extends StatSchemeCreator, RecordCreator { }

export class StatScheme extends Record implements StatSchemeCreator {

    public static async create(creator: StatSchemeCreator) {
        let model = await sails.models.statscheme.create({
            code: creator.code,
            name: creator.name,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new StatScheme(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: StatSchemeModel) {
        return new StatScheme(creator);
    }

    private static $array: StatScheme[] = [];
    public static get array() {
        return this.$array;
    }

    // attributes
    private $code: string;
    public get code() {
        return this.$code;
    }
    public set code(value) {
        this.$code = value;
    }

    private $name: string;
    public get name() {
        return this.$name;
    }
    public set name(value) {
        this.$name = value;
    }

    // additional
    get model() {
        return _.assign(this.saveModel, {
            createdAt: this.createdAt,
            id: this.id,
            updatedAt: this.updatedAt,
        });
    }

    get saveModel() {
        return {
            code: this.code,
            name: this.name,
            // references
        };
    }

    // references

    private constructor(creator: StatSchemeInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.code = creator.code;
        this.name = creator.name;

        // references

        // adding to extension
        StatScheme.array.push(this);
    }
}
