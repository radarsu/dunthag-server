/* tslint:disable:max-line-length */
import {
    Logger, Request, Response, User, express,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let log = new Logger(`policy.class`);

export type PolicyFunction = (req: Request, res: Response, next: express.NextFunction) => void;

export class Policy<T> {
    public static policies: Policy<any>[] = [];

    public init: PolicyFunction;
    // constructor
    constructor(func: PolicyFunction) {
        this.init = func;
    }
}

export let loginAuth = new Policy<{
    user: User,
}>((req: Request, res: Response, next: express.NextFunction) => {
    if (!req.socket || !(<any>req.socket).user) {
        return res.forbidden();
    }

    if (!((<any>req.socket).user instanceof User)) {
        log.error(`req.socket.user is not instanceof User!`);
        return res.forbidden();
    }

    return next();
});
