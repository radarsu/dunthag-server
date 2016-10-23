/* tslint:disable:max-line-length */
import {
    CliTable, Logger, dbLoader, generate, i18n, path,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

let log = new Logger(`launch`);

export class ServerLaunchClass {

    public initiate(cb: () => void) {
        this.proceed().then(cb).catch((err: any) => {
            log.error(err);
            this.lower();
        });
    }

    private async proceed() {
        let libs: Promise<void>[] = [];

        // libraries
        log.debug(Logger.humanizeTranslate(`loading libraries`));
        await Promise.all(libs);

        // some communicates
        let table = new CliTable({
            head: [Logger.translate(`configuration`), Logger.translate(`value`)],
            style: {
                "padding-left": 1,
                compact: true,
                head: ["cyan", "bold"],
            },
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        table.push(
            [Logger.translate(`server language`), sails.config.i18n.defaultLocale],
            [Logger.translate(`logging level`), sails.config.log.level],
            [Logger.translate(`database migrate`), sails.config.models.migrate],
        );

        log.raw(table.toString());

        i18n.configure(<any>{
            directory: path.join(process.cwd(), "config", "locales"),
            directoryPermissions: "777",
        });

        let requiredLaunchTasks: Promise<void>[] = [
            generate.ready(),
        ];

        // required launch tasks
        log.debug(Logger.humanizeTranslate(`running required launch tasks`));
        await Promise.all(requiredLaunchTasks);

        let requiredLateLaunchTasks: (Promise<void> | void)[] = [
            dbLoader.ready(),
        ];

        // required late launch tasks
        log.debug(Logger.humanizeTranslate(`running required late launch tasks`));
        await Promise.all(requiredLateLaunchTasks);
    }

    private lower() {
        sails.lower((lowerErr: Error) => {
            if (lowerErr) {
                log.error(`Error occurred lowering Sails app:`, lowerErr);
                return;
            }

            log.info(`Sails app lowered successfully!`);
            process.exit(1);
        });
    }
}

export let ServerLaunch = new ServerLaunchClass();
