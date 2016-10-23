/* tslint:disable:max-line-length */
import {
    RaceStat, Record, RecordCreator, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface RaceCreator {
    code: string;
    name: string;
}

export interface RaceModel extends RecordCreator {
    code: string;
    name: string;
}

export interface RaceInstanceCreator extends RaceCreator, RecordCreator { }

export class Race extends Record implements RaceCreator {

    public static async create(creator: RaceCreator) {
        let model = await sails.models.race.create({
            code: creator.code,
            name: creator.name,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new Race(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: RaceModel) {
        return new Race(creator);
    }

    private static $array: Race[] = [];
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
    private $raceStats: RaceStat[] = [];
    public get raceStats() {
        return this.$raceStats;
    }
    public set raceStats(value) {
        this.$raceStats = value;
    }

    private constructor(creator: RaceInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.code = creator.code;
        this.name = creator.name;

        // references

        // two way
        // this.raceStats = creator.raceStats;
        // _.each(creator.raceStats, (raceStat) => {
        //     raceStat.race = this;
        // });

        // adding to extension
        Race.array.push(this);
    }
}
