import Module from "../../module";
import hooks from "../../../hooks";

export default class Dupe extends Module {
    constructor() {
        super("Dupe", "Misc");
    }

    onEnable () {
        let inventoryState = hooks.stores.get("inventoryState");
        let itemQuantity = inventoryState[1][inventoryState.selectedItem].q;

        for (let n = 0; n < itemQuantity; n++) {
            hooks.gameWorld.server.sendData(509, [1, "1", inventoryState.selectedItem]);
            hooks.gameWorld.server.sendData(509, [1, "1", inventoryState.selectedItem]);
        }
        
        this.disable()
    }
}