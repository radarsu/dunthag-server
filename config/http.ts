/* tslint:disable:max-line-length */
import {
    express,
} from "../main/utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

module.exports.http = {

    /**
     * ------------------------------------------------------------------------
     *                            Custom middleware
     * ------------------------------------------------------------------------
     */

    middleware: {

        order: [
            "startRequestTimer",
            "cookieParser",
            // "session",
            // "myRequestLogger",
            "bodyParser",
            "handleBodyParserError",
            "compress",
            "methodOverride",
            // "poweredBy",
            "poweredBy",
            "requestLogger",
            // "$custom",
            "router",
            "www",
            "favicon",
            "404",
            "500",
        ],

        poweredBy: (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let app: any = sails.hooks.http.app;
            app.disable(`x-powered-by`);
            res.set(`X-Powered-By`, `dunthag <rkrohmorath@gmail.com>`);
            next();
        },

        requestLogger: (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let type = `empty`;

            if (req.body) {
                type = `body`;
            } else if (req.query) {
                type = `query`;
            }

            sails.log.debug(`Requested ::`, req.method, req.url, `:: ${type} ::`, req.body || req.query);
            return next();
        },

        // bodyParser: require("skipper")

    },

    // cache: 31557600000
};
