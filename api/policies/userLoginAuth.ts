/**
 * ------------------------------------------------------------------------
 *                                loginAuth
 * ------------------------------------------------------------------------
 */
/* tslint:disable:max-line-length */
import {
    Logger, Request, Response, Socket, express,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let log = new Logger(`userLoginAuth`);

module.exports = (req: Request, res: Response, next: express.NextFunction) => {
    log.debug(`initiated`);
    if (!req.socket) {
        return res.forbidden();
    }

    if (!(<any>req.socket).user) {
        let socket = new Socket(req.socket);
        socket.toastr(`this request requires user login authorization`);
        return res.forbidden();
    }

    return next();
};
