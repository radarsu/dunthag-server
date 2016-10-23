/* tslint:disable:max-line-length */
import {
    _, packagejson, yargs,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export class CommanderClass {

    private static $instance: CommanderClass = new CommanderClass();
    static get instance() {
        return this.$instance;
    }

    constructor() {
        if (CommanderClass.$instance) {
            throw new Error(`use Singleton.instance instead of new`);
        }

        CommanderClass.$instance = this;
    }

    public ready() {
        // cli arguments
        let allowedArgs = {
            db: {
                alias: ["D", "generate", "generate-database"],
                describe: "generate default required database entries",
            },
            debug: {
                alias: ["d"],
                describe: "debug mode",
            },
            "force-http": {
                alias: ["h"],
                describe: "force http protocol",
            },
            logs: {
                alias: ["l", "logging", "log-level"],
                choices: ["silly", "verbose", "info", "debug", "warn", "error", "silent"],
                describe: "logging level",
                requiresArg: true,
                type: "string",
            },
            migrate: {
                alias: ["m"],
                choices: ["alter", "safe", "drop"],
                describe: "force other migration type",
                requiresArg: true,
                type: "string",
            },
            port: {
                alias: ["p"],
                describe: "port to launch app",
                requiresArg: true,
                type: "string",
            },
        };

        // version
        yargs.version(packagejson.version)
            .option("language", {
                alias: ["L", "lang"],
                choices: ["pl", "en"],
                describe: "server-side language setup",
                requiresArg: true,
                type: "string",
            });

        // early language setup
        if (yargs.argv.language) {
            yargs.locale(yargs.argv.language);
        }

        // options
        _.each(allowedArgs, (argument: any, name: string) => yargs.option(name, argument));

        // show help
        yargs.help();

        // strict mode
        yargs.strict();
    }
}
