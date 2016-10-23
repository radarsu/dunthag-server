/* tslint:disable:max-line-length */
import {
    User, crypto,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

export type Class<T> = { new (...args: any[]): T; };

export let hash = (password: string, salt: string) => {
    return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

export let isValidPassword = (user: User, passwordString: string) => {
    return user.password === hash(passwordString, user.passwordSalt);
};

export let prewrap = (json: string) => {
    return `<pre style="word-wrap: break-word; white-space: pre-wrap;">${json}</pre>`;
};
