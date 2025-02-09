import Module from "../../module";
import hooks from "../../../hooks";

export default class Speed extends Module {
    constructor () {
        super("Speed", "Movement", {
            "Speed": 15
        })
    }

    onEnable () {
        hooks.gameWorld.player.velocity.__defineGetter__("moveSpeed", () => this.options["Speed"]);
        hooks.gameWorld.player.velocity.__defineSetter__("moveSpeed", () => this.options["Speed"]);
        hooks.gameWorld.player.velocity.__defineGetter__("fastMoveSpeed", () => this.options["Speed"]);
        hooks.gameWorld.player.velocity.__defineSetter__("fastMoveSpeed", () => this.options["Speed"]);
    }

    onDisable () {
        delete hooks.gameWorld.player.velocity.moveSpeed;
        delete hooks.gameWorld.player.velocity.fastMoveSpeed;
        hooks.gameWorld.player.velocity.moveSpeed = 4.5;
        hooks.gameWorld.player.velocity.fastMoveSpeed = 6.4;
    }
};