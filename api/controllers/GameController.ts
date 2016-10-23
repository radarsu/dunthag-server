/* tslint:disable:max-line-length */
import {
    CircularJSON, Controller, ControllerAction, Logger, Schema, game, gameConfig, prewrap, util,
} from "../../main/utility/importer";
/* tslint:enable:max-line-length */

let log = new Logger(`game.controller`);

let config = new ControllerAction<{}>(log.child(`config`), new Schema({}), async (req, res, thisLog, body) => {
    res.ok(gameConfig);
});

let data = new ControllerAction<{}>(log.child(`data`), new Schema({}), async (req, res, thisLog, body) => {
    let gameData = util.inspect(game, {
        depth: 2,
    });
    res.ok(prewrap(gameData));
});

let controller: Controller = {
    config: (req, res) => config.init(req, res),
    data: (req, res) => data.init(req, res),
};

module.exports = controller;
