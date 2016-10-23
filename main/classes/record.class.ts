/* tslint:disable:max-line-length */
import {
    //
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface RecordCreator {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export abstract class Record {

    // attributes
    private $id: string;
    public get id() {
        return this.$id;
    }
    public set id(value) {
        this.$id = value;
    }

    private $createdAt: string;
    public get createdAt() {
        return this.$createdAt;
    }
    public set createdAt(value) {
        this.$createdAt = value;
    }

    private $updatedAt: string;
    public get updatedAt() {
        return this.$updatedAt;
    }
    public set updatedAt(value) {
        this.$updatedAt = value;
    }

    // references

    constructor(creator: RecordCreator) {
        this.id = creator.id;
        this.createdAt = creator.createdAt;
        this.updatedAt = creator.updatedAt;
    }
}
