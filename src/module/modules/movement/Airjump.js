import Module from "../../module";
import hooks from "../../../hooks";

export default class Airjump extends Module {
    constructor () {
        super("Airjump", "Movement", null)
    }

    onRender () {
        if (!hooks?.gameWorld?.player) return;
        hooks.gameWorld.player.collision.isGrounded = true;
    }
};