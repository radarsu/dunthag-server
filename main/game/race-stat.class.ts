/* tslint:disable:max-line-length */
import {
    Race, Record, RecordCreator, Sex, StatScheme, _, game,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface RaceStatCreator {
    value: number;

    // references
    race: Race;
    sex: Sex;
    statScheme: StatScheme;
}

export interface RaceStatModel extends RecordCreator {
    value: number;

    // references
    race: string;
    sex: string;
    statScheme: string;
}

export interface RaceStatInstanceCreator extends RaceStatCreator, RecordCreator { }

export class RaceStat extends Record implements RaceStatCreator {

    public static async create(creator: RaceStatCreator) {
        let model = await sails.models.racestat.create({
            race: creator.race.id,
            sex: creator.sex.id,
            statScheme: creator.statScheme.id,
            value: creator.value,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new RaceStat(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: RaceStatModel) {
        let race = _.find(game.races, (item) => {
            return item.id === creator.race;
        });

        let sex = _.find(game.sexes, (item) => {
            return item.id === creator.sex;
        });

        let statScheme = _.find(game.statSchemes, (item) => {
            return item.id === creator.statScheme;
        });

        let instanceCreator = _.assign(creator, {
            race: race,
            sex: sex,
            statScheme: statScheme,
        });

        return new RaceStat(instanceCreator);
    }

    private static $array: RaceStat[] = [];
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
            race: this.race.id,
            sex: this.sex.id,
            statScheme: this.statScheme.id,
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

    private $statScheme: StatScheme;
    public get statScheme() {
        return this.$statScheme;
    }
    public set statScheme(value) {
        this.$statScheme = value;
    }

    private constructor(creator: RaceStatInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attributes
        this.value = creator.value;

        // references

        // one way
        this.sex = creator.sex;
        this.statScheme = creator.statScheme;

        // two way
        this.race = creator.race;
        creator.race.raceStats.push(this);

        // adding to extension
        RaceStat.array.push(this);
    }
}
