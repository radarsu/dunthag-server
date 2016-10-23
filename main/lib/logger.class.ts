/* tslint:disable:max-line-length */
import {
    CircularJSON, S, _, util,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export type LogType = "error" | "warn" | "debug" | "info" | "verbose" | "silly";

export class Logger {
    public static get splitter() {
        return "::";
    }

    public static get translateDefaults(): i18n.TranslateOptions {
        return {
            locale: sails.config.i18n.defaultLocale,
            phrase: "",
        };
    }

    public static humanizeTranslate(options: i18n.TranslateOptions | string = Logger.translateDefaults) {
        return S(Logger.translate(options)).humanize().s;
    }

    public static translate(options: i18n.TranslateOptions | string = Logger.translateDefaults): string {
        let phrase: string;
        if (typeof options === "string") {
            phrase = options;
        } else {
            phrase = options.phrase;
        }

        options = _.defaults({
            phrase: phrase.toLowerCase(),
        }, Logger.translateDefaults);

        return sails.__(options);
    }

    private $path: string[] = [];
    get path() {
        return this.$path;
    }
    set path(value) {
        this.$path = value;
    }

    constructor(parent: Logger | string, child?: string) {
        if (typeof parent === "string") {
            this.path.push(parent);
            return;
        }

        this.path = this.path.concat(parent.path);
        if (child) {
            this.path.push(child);
        }
    }

    public child(child: string) {
        return new Logger(this, child);
    }

    public log(...args: any[]) {
        return this.sailsLog("debug", ...args);
    }

    public error(...args: any[]) {
        return this.sailsLog("error", ...args);
    }

    public warn(...args: any[]) {
        return this.sailsLog("warn", ...args);
    }

    public debug(...args: any[]) {
        return this.sailsLog("debug", ...args);
    }

    public info(...args: any[]) {
        return this.sailsLog("info", ...args);
    }

    public verbose(...args: any[]) {
        return this.sailsLog("verbose", ...args);
    }

    public silly(...args: any[]) {
        return this.sailsLog("silly", ...args);
    }

    public initiated(...args: any[]) {
        return this.log(`initiated`, ...args);
    }

    public raw(message?: any, ...args: any[]) {
        /* tslint:disable:no-console */
         console.log(message, ...args);
        /* tslint:enable:no-console */
    }

    public inspect(object: any, options?: any) {
        let inspection = util.inspect(object, options);
        this.log(inspection);
        return inspection;
    }

    public json(object: any) {
        return this.log(`json`, CircularJSON.stringify(object, undefined, 2));
    }

    private sailsLog(type: LogType = "debug", ...args: any[]) {
        let splittedArray: any[] = [];
        _.each(args, (item) => {
            splittedArray.push(Logger.splitter);
            splittedArray.push(item);
        });
        (<any>sails).log[type](this.path.join(` ${Logger.splitter} `), ...splittedArray);
        return this;
    }

}
