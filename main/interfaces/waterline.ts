/* tslint:disable:max-line-length */
import {
    //
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

export type Models = "character" | "room" | "user" | "statscheme" | "stat" | "race" | "racestat" | "sex";

export type WaterlineDataTypes = "string" | "text" | "integer" | "float" | "date" | "time" | "datetime" | "boolean" |
    "binary" | "array" | "json";

export interface WaterlineAttribute {
    type?: WaterlineDataTypes;
    required?: boolean;
    unique?: boolean;
    model?: Models;
    collection?: Models;
    via?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    defaultsTo?: any;
    enum?: string[] | number[];
}

export interface WaterlineAttributes { [id: string]: WaterlineAttribute; };
