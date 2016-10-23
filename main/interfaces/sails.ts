/* tslint:disable:max-line-length */
import {
    SocketIO,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

export interface Request extends Express.Request {
    socket?: SocketIO.Socket;
    body?: any;
    query?: any;
}

export interface Response extends Express.Response {
    badRequest: (data?: any, options?: any) => void;
    created: (data?: any, options?: any) => void;
    forbidden: (data?: any, options?: any) => void;
    writable: boolean;
    finished: boolean;
    notFound: (data?: any, options?: any) => void;
    ok: (data?: any, options?: any) => void;
    serverError: (data?: any, options?: any) => void;
    // send: (data?: any, options?: any) => void;
    json: (data?: any, options?: any) => void;
}

export type SailsControllerAction = (req: Request, res: Response) => void;

export type Controller = {
    [id: string]: (req: Request, res: Response) => void;
};

export type ModelsMigrateTypes = "safe" | "alter" | "drop";
