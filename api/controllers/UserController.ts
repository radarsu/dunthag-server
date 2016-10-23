/* tslint:disable:max-line-length */
import {
    Character, Controller, ControllerAction, Logger, Schema, User, _, game, hash, isValidPassword, uuid,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

declare const sails: any;

let log = new Logger(`user.controller`);

let loginPasswordSchema = {
    properties: {
        login: {
            format: "no special characters",
            maxLength: 20,
            minLength: 3,
            type: "string",
        },
        password: {
            minLength: 4,
            type: "string",
        },
    },
    required: ["login", "password"],
};

interface LoginValidatedBody {
    login: string;
    password: string;
}

let create = new ControllerAction<LoginValidatedBody>(
    log.child(`create`),
    new Schema<LoginValidatedBody>(loginPasswordSchema),
    async (req, res, socket, thisLog, body) => {
        let user = _.find(game.users, (current) => {
            return current.login.toLowerCase() === body.login.toLowerCase();
        });

        if (user) {
            throw new Error(`user ${body.login} already exists`);
        }

        let passwordSalt = uuid.v1();

        let created = await User.create({
            login: body.login,
            password: hash(body.password, passwordSalt),
            passwordSalt: passwordSalt,
        });

        socket.toastr({
            message: "user created",
            type: "success",
        });
        res.created(created.model);
    });

let login = new ControllerAction<LoginValidatedBody>(
    log.child(`login`),
    new Schema<LoginValidatedBody>(loginPasswordSchema),
    async (req, res, socket, thisLog, body) => {

        if (!req.socket) {
            throw new Error(`authentication is socket-based. You cannot authenticate without socket connection`);
        }

        let user = _.find(game.users, (current) => {
            return current.login === body.login;
        });

        if (!user) {
            throw new Error(`user ${body.login} does not exists`);
        }

        if (!isValidPassword(user, body.password)) {
            throw new Error(`invalid password.`);
        }

        log.debug(`user`, `${user.login} has logged in.`);
        user.socket = socket;
        socket.path(`/user/${user.login}`);
    });

let self = new ControllerAction<{}>(
    log.child(`self`),
    new Schema({}),
    async (req, res, socket, thisLog, body) => {
        let model = await sails.models.user.findOne({
            id: (<User>socket.user).id
        }).populateAll();

        if (!model) {
            throw new Error(`you are not logged in as user`);
        }

        res.ok(model);
    });

let controller: Controller = {
    create: (req, res) => create.init(req, res),
    login: (req, res) => login.init(req, res),
    self: (req, res) => self.init(req, res),
};

module.exports = controller;
