/* tslint:disable:max-line-length object-literal-sort-keys */
import {
    WaterlineAttributes,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

const attributes: WaterlineAttributes = {
    // attributes
    login: {
        type: "string",
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 20,
    },
    password: {
        type: "string",
        required: true,
        minLength: 4,
    },
    passwordSalt: {
        type: "string",
        required: true,
    },

    // array references
    characters: {
        collection: "character",
        via: "user",
    },
};

module.exports = {
    attributes: attributes,
};
