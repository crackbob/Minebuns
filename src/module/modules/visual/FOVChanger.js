import Module from "../../module";
import hooks from "../../../hooks";

export default class FOVChanger extends Module {
    constructor () {
        super("FOVChanger", "Visual", {
            "FOV": 120
        })
    }

    onRender () {
        let camera = hooks?.gameWorld?.threeScene?.camera || null;
        if (camera?.updateProjectionMatrix && camera.fov !== parseFloat(this.options["FOV"])) {
            camera.fov = parseFloat(this.options["FOV"]);
            camera.updateProjectionMatrix();

            hooks.gameWorld.player.settings.__defineGetter__("fov", () => parseFloat(this.options["FOV"]));
        }
    }

    onDisable () {
        hooks.gameWorld.threeScene.camera = 70;
        hooks.gameWorld.threeScene.camera.updateProjectionMatrix();

        delete hooks.gameWorld.player.settings.fov;
        hooks.gameWorld.player.settings.fov = 70;
    }
};