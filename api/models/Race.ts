/* tslint:disable:max-line-length object-literal-sort-keys */
import {
    WaterlineAttributes,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

const attributes: WaterlineAttributes = {
    name: {
        type: "string",
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
    },
    code: {
        type: "string",
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
    },
    raceStats: {
        collection: "racestat",
        via: "race",
    },
};

module.exports = {
    attributes: attributes,
};
