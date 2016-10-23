/* tslint:disable:max-line-length object-literal-sort-keys */
import {
    WaterlineAttributes,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

const attributes: WaterlineAttributes = {
    value: {
        type: "integer",
        required: true,
        min: 0,
    },

    // single references
    character: {
        model: "character",
        required: true,
    },
    statScheme: {
        model: "statscheme",
        required: true,
    },
};

module.exports = {
    attributes: attributes,
};
