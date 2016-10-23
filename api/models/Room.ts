/* tslint:disable:max-line-length object-literal-sort-keys */
import {
    WaterlineAttributes,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

const attributes: WaterlineAttributes = {
    // attributes
    name: {
        type: "string",
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    width: {
        type: "integer",
        min: 0,
        defaultsTo: 20,
    },
    height: {
        type: "integer",
        min: 0,
        defaultsTo: 14,
    },

    // array references
    characters: {
        collection: "character",
        via: "room",
    },
};

module.exports = {
    attributes: attributes,
};
