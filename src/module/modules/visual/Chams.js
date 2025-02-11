import Module from "../../module";
import hooks from "../../../hooks";

export default class Chams extends Module {
    constructor () {
        super("Chams", "Visual", null)
    }

    onRender () {
        hooks.gameWorld.server.players.forEach(child => {
            child.playerMaterial.depthTest = false;
            child.playerMaterial.wireframe = true;
        });
    }

    onDisable () {
        hooks.gameWorld.server.players.forEach(child => {
            child.playerMaterial.depthTest = true;
            child.playerMaterial.wireframe = false;
        });
    }
};