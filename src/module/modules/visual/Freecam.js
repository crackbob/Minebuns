import Module from "../../module";
import hooks from "../../../hooks";
import packets from "../../../packets";

export default class Freecam extends Module {
    constructor () {
        super("Freecam", "Visual", {
            "3rd person": "true"
        })
        this._copy = null;
        this.realPos = null;
    }

    get playerModel () {
        return hooks.gameWorld.systemsManager.activeSystems.find(sys => sys?.model).model;
    }

    onEnable () {
        const gameWorld = hooks.gameWorld;
        let delay = 0;

        if (gameWorld.player.cameraMode == 1 && this.options["3rd person"] == "true") {
            hooks.gameWorld.switchCameraView();
            delay = 100;
        }

        hooks.gameWorld.server.msgsListeners[packets.toClient.SET_INVISIBLE_MODE]();

        setTimeout(() => {
            this._copy = this._copy || this.playerModel.position.copy;
            this.playerModel.position.copy = () => {};
            this.realPos = this.playerModel.position;
        }, delay);
    }

    onDisable () {
        hooks.gameWorld.server.msgsListeners[packets.toClient.SET_WALK_MODE]();
        this.playerModel.position.copy = this._copy.bind(this.playerModel.position);
        this.playerModel.position = this.realPos;
    }
};