import Module from "../../module";
import hooks from "../../../hooks";

export default class HighJump extends Module {
    constructor () {
        super("HighJump", "Movement", {
            "Jump Height": 25
        })
    }

    onRender () {
        hooks.gameWorld.player.velocity.jumpSpeed = parseFloat(this.options["Jump Height"]);
    }

    onDisable () {
        hooks.gameWorld.player.velocity.jumpSpeed = 8.285714285714286;
    }
};