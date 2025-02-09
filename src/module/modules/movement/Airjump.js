import Module from "../../module";
import hooks from "../../../hooks";

export default class Airjump extends Module {
    constructor () {
        super("Airjump", "Movement", null)
    }

    onEnable () {
        hooks.gameWorld.player.collision.__defineGetter__("isGrounded", () => true);
        hooks.gameWorld.player.collision.__defineSetter__("isGrounded", () => true);
    }

    onDisable () {
        delete hooks.gameWorld.player.collision.isGrounded;
        hooks.gameWorld.player.collision.isGrounded = true;
    }
};