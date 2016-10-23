/* tslint:disable:max-line-length */
import {
    CircularJSON, PrettyError, ToastrData, _,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let pe = new PrettyError();
pe.appendStyle({
    "pretty-error": {
        marginLeft: 0,
    },
    "pretty-error > trace > item": {
        bullet: "' <grey>o</grey> '",
        marginLeft: 0,
    },
});

export declare class Error {
    public message: string;
    public name: string;
    public stack: string;
    constructor(message?: string);
}

export interface RErrorInterface {
    errors?: any[] | Error;
    publicErrors?: any[];
    toastrErrors?: ToastrData[];
}

export interface RErrorCreator extends ToastrData, RErrorInterface {
    data?: any;
}

export class RError extends Error implements RErrorInterface {

    // internal hidden errors
    public errors: {}[];
    // not translated, pure api errors for public
    public publicErrors: {}[];
    // translated errors for public
    public toastrErrors: ToastrData[];
    // additional data
    public data?: any;

    constructor(options: RErrorCreator | string) {
        super();

        if (typeof options === "string") {
            options = {
                message: options,
            };
        }

        if (!options.message) {
            options.message = "";
        }

        options.message = options.message.replace(/\n/g, "").replace(/\s\s/g, "");

        // Interlan errors automatic array-sification
        if (Array.isArray(options.errors)) {
            this.errors = options.errors;
        } else if (options.errors) {
            this.errors = [options.errors];
        } else {
            this.errors = [options.message];
        }

        this.publicErrors = options.publicErrors || [options.message];
        this.toastrErrors = options.toastrErrors || [{
            message: options.message,
            title: options.title,
            type: options.type,
        }];

        // Error
        this.name = this.constructor.name;
        this.stack = this.printToConsole(this.errors, this.publicErrors, this.toastrErrors);
        this.message = this.stack;

        // Additional data
        if (options.data) {
            this.data = options.data;
        }
    }

    private render(error: any) {
        return pe.render(error); // .split("\n").reverse().join("\n");
    }

    // private renderReverse(error: any) {
    //     return this.render(error).split("\n").reverse().join("\n");
    // }

    private plainObject(err: any, filter?: (number | string)[], space?: number) {
        if (!(err instanceof Error)) {
            return err;
        }

        let plainObject: any = {};
        Object.getOwnPropertyNames(err).forEach((key) => {
            plainObject[key] = (<any>err)[key];
        });

        delete plainObject.message;
        delete plainObject.name;
        // delete plainObject.stack;

        return plainObject;
    }

    private printToConsole(errors: {}[], publicErrors: {}[], toastrErrors: ToastrData[]) {
        let renderedErrors = "";
        let plainErrors: any[] = [];
        _.each(errors, (error, i) => {
            renderedErrors += `${i} ${this.render(error)}`;
            plainErrors.push(this.plainObject(error));
        });

        let jsonErrors = CircularJSON.stringify({
            errors: plainErrors,
            publicErrors: publicErrors,
            toastrErrors: toastrErrors,
        }, undefined, 2).replace(/\\n/g, "\n");

        return `json :: ${jsonErrors}`; // \nrendered :: ${renderedErrors}`;
    }

}
