/* tslint:disable:max-line-length */
import {
    Character, Race, RaceStat, Room, Sex, Stat, StatScheme, User,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

// let log = new Logger(`game.class`);

export class Game {
    // attributes
    private $name: string;
    get name() {
        return this.$name;
    }
    set name(value: string) {
        this.$name = value;
    }

    // array references
    private $characters: Character[] = Character.array;
    get characters() {
        return this.$characters;
    }

    private $races: Race[] = Race.array;
    get races() {
        return this.$races;
    }

    private $raceStats: RaceStat[] = RaceStat.array;
    get raceStats() {
        return this.$raceStats;
    }

    private $rooms: Room[] = Room.array;
    get rooms() {
        return this.$rooms;
    }

    private $sexes: Sex[] = Sex.array;
    get sexes() {
        return this.$sexes;
    }

    private $stats: Stat[] = Stat.array;
    get stats() {
        return this.$stats;
    }

    private $statSchemes: StatScheme[] = StatScheme.array;
    get statSchemes() {
        return this.$statSchemes;
    }

    private $users: User[] = User.array;
    get users() {
        return this.$users;
    }

    constructor(name: string) {
        this.name = name;
    }
}
