/* tslint:disable:max-line-length */
import {
    Ajv, CircularJSON, Logger, RError, Request, Response, S, Schema, Socket, _,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

export interface ControllerActionValidatedBody<T> {
    (req: Request, res: Response, socket: Socket, log: Logger, body: T): void;
}

export class ControllerAction<T> {

    private schema: Schema<T>;
    private action: ControllerActionValidatedBody<T>;
    private log: Logger;

    constructor(
        log: Logger,
        schema: Schema<T>,
        action: ControllerActionValidatedBody<T>,
    ) {
        this.log = log;
        if (schema instanceof Schema) {
            this.schema = schema;
        } else {
            this.schema = new Schema<T>(schema);
        }
        this.action = action;
    }

    public async init(req: Request, res: Response) {
        let socket = new Socket(req.socket);
        this.proceed(req, res, socket).catch((err: Error) => this.catchErr(req, res, socket, err));
    }

    private catchErr(req: Request, res: Response, socket: Socket, err: any) {
        let out = err.message;
        this.log.error(`catchErr`, err);

        let jsonedError = CircularJSON.parse(CircularJSON.stringify(err));
        this.log.error(`jsonErr`, jsonedError);

        if (jsonedError.error === "E_VALIDATION") {
            this.log.error("OLD TYPE E_VALIDATION EXISTS! DONT REMOVE!");
            if (Array.isArray(err.errors)) {
                out = err.errors;

                _.each(err.errors, (error, errField) => {
                    socket.toastr({
                        message: Logger.humanizeTranslate(err.dataPath.replace(".", "")),
                        title: Logger.humanizeTranslate(`invalid field`),
                    });
                });

            } else if (typeof err.errors === "object") {
                _.forOwn(err.invalidAttributes, (errorList: any[], errField: string) => {
                    let parsedErrors: string[] = [];

                    _.each(errorList, (innerError: any) => {
                        parsedErrors.push(Logger.translate(innerError.rule));
                    });

                    parsedErrors[0] = S(parsedErrors[0]).capitalize().s;

                    socket.toastr({
                        message: parsedErrors.join(", "),
                        title: `${Logger.humanizeTranslate(`invalid field`)}: ${Logger.translate(errField)}`,
                    });
                });
            }
        } else if (err instanceof (<any>Ajv).ValidationError) {
            if (Array.isArray(err.errors)) {
                out = err.errors;

                _.each(err.errors, (error, errField) => {
                    socket.toastr({
                        message: `${Logger.humanizeTranslate(error.dataPath.replace(".", ""))}
                        (${Logger.translate(error.keyword)})`,
                        title: Logger.humanizeTranslate(`invalid field`),
                    });
                });

            } else if (typeof err.errors === "object") {
                _.forOwn(err.invalidAttributes, (errorList: any[], errField: string) => {
                    let parsedErrors: string[] = [];

                    _.each(errorList, (innerError: any) => {
                        parsedErrors.push(Logger.translate(innerError.rule));
                    });

                    parsedErrors[0] = S(parsedErrors[0]).capitalize().s;

                    socket.toastr({
                        message: parsedErrors.join(", "),
                        title: `${Logger.humanizeTranslate(`invalid field`)}: ${Logger.translate(errField)}`,
                    });
                });
            }
        } else if (err instanceof RError && Array.isArray(err.toastrErrors)) {
            _.each(err.toastrErrors, (toastr) => {
                socket.toastr(toastr);
            });
        } else if (err instanceof Error) {
            socket.toastr(Logger.humanizeTranslate(err.message));
        }

        if (res.writable && !res.finished) {
            res.json(out);
        }
    }

    private async proceed(req: Request, res: Response, socket: Socket) {
        let data: T = req.body || req.query || {};
        await this.schema.validate(data);
        this.log.debug(`validated`, data);
        await this.action(req, res, socket, this.log, data);

        if (res.writable && !res.finished) {
            res.ok("OK");
        }
    }
}
