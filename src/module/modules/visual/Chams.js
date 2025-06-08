import Module from "../../module";
import hooks from "../../../hooks";

export default class Chams extends Module {
    constructor () {
        super("Chams", "Visual", null)
    }

    onRender () {
        if (!hooks?.gameWorld?.player) return;
        
        hooks.gameWorld.server.players.forEach(player => {
            player.playerMaterial.depthTest = false;
            player.playerMaterial.wireframe = true;
        });
    }

    onDisable () {
        hooks.gameWorld.server.players.forEach(player => {
            player.playerMaterial.depthTest = true;
            player.playerMaterial.wireframe = false;
        });
    }
};