/* tslint:disable:max-line-length */
import {
    Models,
} from "../utility/importer";
/* tslint:enable:max-line-length */

export interface ReferenceInterface {
    model: Models;
    via: string;
}

export interface ModelClass {
    references: ReferenceInterface[];
}
