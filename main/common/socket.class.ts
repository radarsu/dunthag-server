/* tslint:disable:max-line-length */
import {
    Logger, User,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

export interface ToastrData {
    message?: string;
    title?: string;
    type?: "error" | "warn" | "info" | "success";
}

export interface PathData {
    path?: string;
}

export class Socket {

    /**
     * ------------------------------------------------------------------------
     *                                Properties
     * ------------------------------------------------------------------------
     */
    public reqSocket?: SocketIO.Socket;

    private $user?: User;
    public get user() {
        return this.$user;
    }
    public set user(value) {
        this.$user = value;
        (<any>this.reqSocket).user = value;
    }

    constructor(options?: SocketIO.Socket) {
        this.reqSocket = options;
        if (this.reqSocket) {
            this.user = (<any>this.reqSocket).user;
        }
    }

    /**
     * ------------------------------------------------------------------------
     *                                 Methods
     * ------------------------------------------------------------------------
     */
    public emit(event: string, ...args: any[]): boolean {
        if (!this.reqSocket) {
            return false;
        }

        this.reqSocket.emit(event, ...args);
        return true;
    }

    public path(data: PathData | "string") {
        if (typeof data === "string") {
            data = {
                path: data,
            };
        }

        this.emit("path", data);
    }

    public toastr(data: ToastrData | string) {
        if (typeof data === "string") {
            data = {
                message: data,
            };
        }

        let defaults: ToastrData;
        switch (data.type) {
            case "warn":
                defaults = {
                    message: Logger.humanizeTranslate("an error occurred"),
                    title: Logger.humanizeTranslate("warning"),
                    type: "warn",
                };
                break;
            case "info":
                defaults = {
                    message: Logger.humanizeTranslate("operation in progress"),
                    title: Logger.humanizeTranslate("operation in progress"),
                    type: "info",
                };
                break;
            case "success":
                defaults = {
                    message: Logger.humanizeTranslate("operation finished"),
                    title: Logger.humanizeTranslate("success"),
                    type: "success",
                };
                break;
            case "error":
            default:
                defaults = {
                    message: Logger.humanizeTranslate("an error occurred"),
                    title: Logger.humanizeTranslate("an error occurred"),
                    type: "error",
                };
                break;
        }

        return this.emit("toastr", {
            message: data.message || defaults.message,
            title: data.title || defaults.title,
            type: data.type || defaults.type,
        });
    }

}
