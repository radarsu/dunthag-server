/* tslint:disable:max-line-length */
import {
    ServerLaunch,
} from "../main/utility/importer";
/* tslint:enable:max-line-length */

module.exports.bootstrap = (cb: () => void) => ServerLaunch.initiate(cb);
