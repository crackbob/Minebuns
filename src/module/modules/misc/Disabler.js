import Module from "../../module";
import hooks from "../../../hooks";

export default class Disabler extends Module {
    constructor() {
        super("Disabler", "Misc");
    }

    onEnable() {
        // we can't be serious bro
        hooks.stores.gameState.gameWorld.server.msgsListeners[37] = () => {};
    }
}