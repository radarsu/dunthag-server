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
        unique: true,
        minLength: 4,
        maxLength: 20,
    },
    description: {
        type: "text",
    },
    x: {
        type: "integer",
        min: 0,
        defaultsTo: 0,
    },
    y: {
        type: "integer",
        min: 0,
        defaultsTo: 0,
    },
    hasAvatar: {
        type: "boolean",
        defaultsTo: false,
    },

    // single references
    room: {
        model: "room",
        required: true,
    },
    user: {
        model: "user",
        required: true,
    },
    race: {
        model: "race",
        required: true,
    },
    sex: {
        model: "sex",
        required: true,
    },

    // array references
    stats: {
        collection: "stat",
        via: "character",
    },
};

module.exports = {
    attributes: attributes,
};
