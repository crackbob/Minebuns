import Module from "../../module";
import hooks from "../../../hooks";

export default class Speed extends Module {
    constructor () {
        super("Speed", "Movement", {
            "Speed": 15
        })
    }

    onRender () {
        if (!hooks?.gameWorld?.player) return;
        hooks.gameWorld.player.velocity.moveSpeed = this.options["Speed"];
        hooks.gameWorld.player.velocity.fastMoveSpeed = this.options["Speed"];
    }

    onDisable () {
        hooks.gameWorld.player.velocity.moveSpeed = 4.5;
        hooks.gameWorld.player.velocity.fastMoveSpeed = 6.4;
    }
};