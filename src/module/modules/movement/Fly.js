import Module from "../../module";
import hooks from "../../../hooks";

export default class Fly extends Module {
    constructor () {
        super("Fly", "Movement", {
            "Vertical Speed": 5
        })
    }

    onRender () {
        if (!hooks?.gameWorld?.player) return;
        hooks.gameWorld.player.velocity.gravity = 0;

        if (hooks?.gameWorld?.player?.inputs.jump) {
            hooks.gameWorld.player.velocity.velVec3.y = this.options["Vertical Speed"];
        } else if (hooks?.gameWorld?.player?.inputs.crouch) {
            hooks.gameWorld.player.velocity.velVec3.y = -this.options["Vertical Speed"];
        } else {
            hooks.gameWorld.player.velocity.velVec3.y = 0;
        }
    }

    onDisable () {
        hooks.gameWorld.player.velocity.gravity = 23;
    }
};