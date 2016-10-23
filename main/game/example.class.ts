/* tslint:disable:max-line-length */
import {
    Record, RecordCreator, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface ExampleCreator {
    //
}

export interface ExampleModel extends RecordCreator {
    //
}

export interface ExampleInstanceCreator extends ExampleCreator, RecordCreator { }

export class Example extends Record implements ExampleCreator {

    public static async create(creator: ExampleCreator) {
        let model = await sails.models.example.create({
            //
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Example(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: ExampleModel) {
        return new Example(creator);
    }

    private static $array: Example[] = [];
    public static get array() {
        return this.$array;
    }

    // attributes

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

            // references

        };
    }

    // references

    // one way

    // two way

    private constructor(creator: ExampleInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues

        // references

        // one way

        // two way

        // adding to extension
        Example.array.push(this);
    }
}
