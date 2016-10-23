/* tslint:disable:max-line-length */
import {
    Logger,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let log = new Logger(`cli`);

module.exports = (sails: any) => {
    process.on("uncaughtException", (err: any) => {
        log.error(err);
    });

    process.on("unhandledRejection", (err: any) => {
        log.error(err);
    });

    sails.log.verbose(`cli hook loaded successfully`);
    return {};
};
