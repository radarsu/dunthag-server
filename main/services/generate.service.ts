/* tslint:disable:max-line-length */
import {
    Logger, Race, RaceStat, Room, Sex, StatScheme, _, yargs,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

let log = new Logger(`generate`);

export let generate = {
    ready: async () => {

        if (!yargs.argv.generate) {
            return;
        }

        // stat schemes
        let str = await StatScheme.create({
            code: "str",
            name: "krzepa",
        });

        let agi = await StatScheme.create({
            code: "agi",
            name: "zwinność",
        });

        let int = await StatScheme.create({
            code: "int",
            name: "rzemiosło",
        });

        let free = await StatScheme.create({
            code: "free",
            name: "los",
        });

        // races
        let human = await Race.create({
            code: "human",
            name: "człowiek",
        });

        let elf = await Race.create({
            code: "elf",
            name: "elf",
        });

        let dwarf = await Race.create({
            code: "dwarf",
            name: "krasnolud",
        });

        let halfling = await Race.create({
            code: "halfling",
            name: "niziołek",
        });

        let orc = await Race.create({
            code: "orc",
            name: "ork",
        });

        let goblin = await Race.create({
            code: "goblin",
            name: "goblin",
        });

        // sexes
        let male = await Sex.create({
            code: "male",
            name: "mężczyzna",
        });

        let female = await Sex.create({
            code: "female",
            name: "kobieta",
        });

        // race stats

        // human male stats
        let humanMale = {
            race: human.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(humanMale, {
            statScheme: str.instance,
            value: 8,
        }));

        await RaceStat.create(_.assign(humanMale, {
            statScheme: agi.instance,
            value: 8,
        }));

        await RaceStat.create(_.assign(humanMale, {
            statScheme: int.instance,
            value: 8,
        }));

        await RaceStat.create(_.assign(humanMale, {
            statScheme: free.instance,
            value: 6,
        }));

        // human female stats
        let humanFemale = {
            race: human.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(humanFemale, {
            statScheme: str.instance,
            value: 5,
        }));

        await RaceStat.create(_.assign(humanFemale, {
            statScheme: agi.instance,
            value: 9,
        }));

        await RaceStat.create(_.assign(humanFemale, {
            statScheme: int.instance,
            value: 10,
        }));

        await RaceStat.create(_.assign(humanFemale, {
            statScheme: free.instance,
            value: 6,
        }));

        // elf male stats
        let elfMale = {
            race: elf.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(elfMale, {
            statScheme: str.instance,
            value: 7,
        }));

        await RaceStat.create(_.assign(elfMale, {
            statScheme: agi.instance,
            value: 11,
        }));

        await RaceStat.create(_.assign(elfMale, {
            statScheme: int.instance,
            value: 9,
        }));

        await RaceStat.create(_.assign(elfMale, {
            statScheme: free.instance,
            value: 3,
        }));

        // elf female stats
        let elfFemale = {
            race: elf.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(elfFemale, {
            statScheme: str.instance,
            value: 5,
        }));

        await RaceStat.create(_.assign(elfFemale, {
            statScheme: agi.instance,
            value: 11,
        }));

        await RaceStat.create(_.assign(elfFemale, {
            statScheme: int.instance,
            value: 10,
        }));

        await RaceStat.create(_.assign(elfFemale, {
            statScheme: free.instance,
            value: 4,
        }));

        // dwarf male stats
        let dwarfMale = {
            race: dwarf.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(dwarfMale, {
            statScheme: str.instance,
            value: 10,
        }));

        await RaceStat.create(_.assign(dwarfMale, {
            statScheme: agi.instance,
            value: 5,
        }));

        await RaceStat.create(_.assign(dwarfMale, {
            statScheme: int.instance,
            value: 10,
        }));

        await RaceStat.create(_.assign(dwarfMale, {
            statScheme: free.instance,
            value: 5,
        }));

        // dwarf female stats
        let dwarfFemale = {
            race: dwarf.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(dwarfFemale, {
            statScheme: str.instance,
            value: 7,
        }));

        await RaceStat.create(_.assign(dwarfFemale, {
            statScheme: agi.instance,
            value: 7,
        }));

        await RaceStat.create(_.assign(dwarfFemale, {
            statScheme: int.instance,
            value: 11,
        }));

        await RaceStat.create(_.assign(dwarfFemale, {
            statScheme: free.instance,
            value: 5,
        }));

        // halfling male stats
        let halflingMale = {
            race: halfling.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(halflingMale, {
            statScheme: str.instance,
            value: 6,
        }));

        await RaceStat.create(_.assign(halflingMale, {
            statScheme: agi.instance,
            value: 12,
        }));

        await RaceStat.create(_.assign(halflingMale, {
            statScheme: int.instance,
            value: 10,
        }));

        await RaceStat.create(_.assign(halflingMale, {
            statScheme: free.instance,
            value: 2,
        }));

        // halfling female stats
        let halflingFemale = {
            race: halfling.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(halflingFemale, {
            statScheme: str.instance,
            value: 4,
        }));

        await RaceStat.create(_.assign(halflingFemale, {
            statScheme: agi.instance,
            value: 12,
        }));

        await RaceStat.create(_.assign(halflingFemale, {
            statScheme: int.instance,
            value: 11,
        }));

        await RaceStat.create(_.assign(halflingFemale, {
            statScheme: free.instance,
            value: 3,
        }));

        // orc male stats
        let orcMale = {
            race: orc.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(orcMale, {
            statScheme: str.instance,
            value: 13,
        }));

        await RaceStat.create(_.assign(orcMale, {
            statScheme: agi.instance,
            value: 8,
        }));

        await RaceStat.create(_.assign(orcMale, {
            statScheme: int.instance,
            value: 5,
        }));

        await RaceStat.create(_.assign(orcMale, {
            statScheme: free.instance,
            value: 4,
        }));

        // orc female stats
        let orcFemale = {
            race: orc.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(orcFemale, {
            statScheme: str.instance,
            value: 9,
        }));

        await RaceStat.create(_.assign(orcFemale, {
            statScheme: agi.instance,
            value: 11,
        }));

        await RaceStat.create(_.assign(orcFemale, {
            statScheme: int.instance,
            value: 7,
        }));

        await RaceStat.create(_.assign(orcFemale, {
            statScheme: free.instance,
            value: 3,
        }));

        // goblin male stats
        let goblinMale = {
            race: goblin.instance,
            sex: male.instance,
        };

        await RaceStat.create(_.assign(goblinMale, {
            statScheme: str.instance,
            value: 6,
        }));

        await RaceStat.create(_.assign(goblinMale, {
            statScheme: agi.instance,
            value: 12,
        }));

        await RaceStat.create(_.assign(goblinMale, {
            statScheme: int.instance,
            value: 6,
        }));

        await RaceStat.create(_.assign(goblinMale, {
            statScheme: free.instance,
            value: 6,
        }));

        // goblin female stats
        let goblinFemale = {
            race: goblin.instance,
            sex: female.instance,
        };

        await RaceStat.create(_.assign(goblinFemale, {
            statScheme: str.instance,
            value: 5,
        }));

        await RaceStat.create(_.assign(goblinFemale, {
            statScheme: agi.instance,
            value: 13,
        }));

        await RaceStat.create(_.assign(goblinFemale, {
            statScheme: int.instance,
            value: 8,
        }));

        await RaceStat.create(_.assign(goblinFemale, {
            statScheme: free.instance,
            value: 4,
        }));

        // rooms
        await Room.create({
            name: "Karczma",
            width: 20,
            height: 15,
        });

        log.debug(`generating instances`);
    },
};
