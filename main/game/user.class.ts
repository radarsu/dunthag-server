/* tslint:disable:max-line-length */
import {
    Character, Record, RecordCreator, Socket, _,
} from "../utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

export interface UserCreator {
    login: string;
    password: string;
    passwordSalt: string;
}

export interface UserModel extends RecordCreator {
    login: string;
    password: string;
    passwordSalt: string;

    // references
}

export interface UserInstanceCreator extends UserCreator, RecordCreator { }

export class User extends Record implements UserCreator {

    public static async create(creator: UserCreator) {
        let model = await sails.models.user.create({
            login: creator.login,
            password: creator.password,
            passwordSalt: creator.passwordSalt,
        });

        let instanceCreator = _.assign(creator, {
            createdAt: model.createdAt,
            id: model.id,
            updatedAt: model.updatedAt,
        });

        let instance = new User(instanceCreator);
        return {
            instance: instance,
            model: model,
        };
    }

    public static load(creator: UserModel) {
        return new User(creator);
    }

    private static $array: User[] = [];
    public static get array() {
        return this.$array;
    }

    // attributes
    private $login: string;
    public get login() {
        return this.$login;
    }
    public set login(value) {
        this.$login = value;
    }

    private $password: string;
    public get password() {
        return this.$password;
    }
    public set password(value) {
        this.$password = value;
    }

    private $passwordSalt: string;
    public get passwordSalt() {
        return this.$passwordSalt;
    }
    public set passwordSalt(value) {
        this.$passwordSalt = value;
    }

    // additional
    private $socket?: Socket;
    get socket() {
        return this.$socket;
    }
    set socket(value) {
        if (value) {
            this.$socket = value;
            this.$socket.user = this;
        }
    }

    private $character?: Character;
    get character() {
        return this.$character;
    }
    set character(value) {
        this.$character = value;
    }

    get model() {
        return _.assign(this.saveModel, {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }

    get saveModel() {
        return {
            login: this.login,
            password: this.password,
            passwordSalt: this.passwordSalt,
            // references
        };
    }

    // references
    private $characters: Character[] = [];
    public get characters() {
        return this.$characters;
    }
    public set characters(value) {
        this.$characters = value;
    }

    private constructor(creator: UserInstanceCreator) {
        super({
            createdAt: creator.createdAt,
            id: creator.id,
            updatedAt: creator.updatedAt,
        });

        // attribtues
        this.login = creator.login;
        this.password = creator.password;
        this.passwordSalt = creator.passwordSalt;

        // references

        // two way
        // this.characters = creator.characters;
        // _.each(this.characters, (character) => {
        //     character.user = this;
        // });

        // adding to extension
        User.array.push(this);
    }
}
