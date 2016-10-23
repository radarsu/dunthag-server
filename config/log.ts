/* tslint:disable:max-line-length */
import {
    _, colors, moment, winston, yargs,
} from "../main/utility/importer";
/* tslint:enable:max-line-length */

import i18n from "./i18n";

moment.locale(i18n.defaultLocale);

type LogLevel = "silly" | "verbose" | "info" | "debug" | "warn" | "error" | "silent";

let level: LogLevel = "verbose";
if (yargs.argv.logs) {
    level = yargs.argv.logs;
}

let winstonConsole = {
    colorize: true,
    json: false,
    level: level,
    prettyPrint: true,
    timestamp: function() {
        // return colors.grey(`${moment().calendar()}:${moment().format(`ss`)}`);
        return colors.grey(`[${moment().format("HH:mm:ss")}]`);
    },
};

/* tslint:disable:no-var-requires */
let captainsLogDefaults = require("../node_modules/captains-log/lib/defaults.js");
/* tslint:enable:no-var-requires */
let captainsLogLevels = captainsLogDefaults.OPTIONS.logLevels;
let captainsLogColors = captainsLogDefaults.OVERRIDES.colors;
let maxLogLevel: number = <number>_.max(_.values(captainsLogLevels));

let standarizedLogLevels = _.mapValues(captainsLogLevels, (logLevel: number, logLevelName: string) => {
    return maxLogLevel - logLevel;
});

let logger = new (winston.Logger)({
    exceptionHandlers: [
        new winston.transports.File({
            filename: `./data/logs/exceptions.log`,
        }),
    ],
    levels: standarizedLogLevels,
    transports: [
        new (winston.transports.Console)(winstonConsole),
        new winston.transports.File({
            colorize: true,
            filename: `./data/logs/main.log`,
            json: false,
            level: level,
            maxFiles: 3,
            maxsize: 1280000,
            timestamp: true,
        }),
    ],
});

winston.addColors(captainsLogColors);

let log = {
    colorize: false,
    custom: logger,
    filePath: `./data/logs/main.log`,
    inspect: false,
    level: level,
};

module.exports.log = log;
