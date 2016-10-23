/**
 * ------------------------------------------------------------------------
 *               Internationalization / Localization Settings
 * ------------------------------------------------------------------------
 */

/* tslint:disable:max-line-length */
import {
    yargs,
} from "../main/utility/importer";
/* tslint:enable:max-line-length */

let i18n = {
    defaultLocale: yargs.argv.language || "pl",
    extension: ".json",
    locales: ["pl", "en"],
    updateFiles: true,
};

module.exports.i18n = i18n;
export default i18n;
