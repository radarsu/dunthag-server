/* tslint:disable:max-line-length object-literal-sort-keys */
import {
    WaterlineAttributes,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

const attributes: WaterlineAttributes = {
    value: {
        type: "integer",
        required: true,
        min: 1,
    },

    // single references
    race: {
        model: "race",
        required: true,
    },
    sex: {
        model: "sex",
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
