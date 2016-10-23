/* tslint:disable:max-line-length */
import {
    Record, RecordCreator, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface SexCreator {
    code: string;
    name: string;
}

export interface SexModel extends RecordCreator {
    code: string;
    name: string;
}

export interface SexInstanceCreator extends SexCreator, RecordCreator { }

export class Sex extends Record implements SexCreator {

    public static async create(creator: SexCreator) {
        let model = await sails.models.sex.create({
            code: creator.code,
            name: creator.name,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Sex(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: SexModel) {
        return new Sex(creator);
    }

    private static $array: Sex[] = [];
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
            id: this.id,
            createdAt: this.createdAt,
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

    private constructor(creator: SexInstanceCreator) {
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
        Sex.array.push(this);
    }
}
