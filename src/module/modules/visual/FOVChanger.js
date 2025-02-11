import Module from "../../module";
import hooks from "../../../hooks";

export default class FOVChanger extends Module {
    constructor () {
        super("FOVChanger", "Visual", {
            "FOV": 80
        })
    }

    onEnable () {
        hooks.gameWorld.player.settings.__defineGetter__("fov", () => parseFloat(this.options["FOV"]));
    }

    onDisable () {
        delete hooks.gameWorld.player.settings.fov;
        hooks.gameWorld.player.settings.fov = 70;
    }
};