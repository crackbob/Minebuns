import Module from "../../module";
import hooks from "../../../hooks";

export default class Disabler extends Module {
    constructor() {
        super("Disabler", "Misc");
        this.packetID = null;
    }

    insaneBypass () {
        // wow
    }

    onRender() {
        if (!hooks?.gameWorld?.player) return;
        
        let msgListeners = hooks.stores.gameState.gameWorld.server.msgsListeners;

        if (!this.packetID) {
            this.packetID = Object.keys(msgListeners).find(key => msgListeners[key].toString().includes("correct pos"));
        }

        if (msgListeners[this.packetID] !== this.insaneBypass) {
            msgListeners[this.packetID] = this.insaneBypass;
        }
    }
}