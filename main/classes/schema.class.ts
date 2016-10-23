/* tslint:disable:max-line-length */
import {
    Ajv, Logger, _, ajv,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let log = new Logger(`schema.class`);

let baseSchema = {
    $async: true,
    additionalProperties: false,
};

export class Schema<T> {

    private validator: Ajv.ValidateFunction;
    // forcing type checking
    private discriminator: T;

    // constructor
    constructor(jsonSchema: any) {
        let schema = _.defaults(jsonSchema, baseSchema);
        this.validator = ajv.compile(schema);
    }

    public async validate(data: any): Promise<T> {
        await this.validator(data);
        return data;
    }
}

export interface CreateCharacterInterface {
    name: string;
    sex: string;
    race: string;
    stats: {
        str: number;
        agi: number;
        int: number;
        free: number;
        [id: string]: number;
    };
};

export let createCharacterSchema = new Schema<CreateCharacterInterface>({
    properties: {
        name: {
            format: "no special characters",
            maxLength: 20,
            minLength: 3,
            type: "string",
        },
        sex: {
            format: "sex",
            type: "string",
        },
        race: {
            format: "race",
            type: "string",
        },
        stats: {
            properties: {
                str: {
                    type: "number",
                    min: 1,
                },
                agi: {
                    type: "number",
                    min: 1,
                },
                int: {
                    type: "number",
                    min: 1,
                },
                free: {
                    type: "number",
                    min: 0,
                    max: 0,
                },
            },
            required: ["str", "agi", "int", "free"],
        },
    },
    required: ["name", "sex", "race", "stats"],
});
