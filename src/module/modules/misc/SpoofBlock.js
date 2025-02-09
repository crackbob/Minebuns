import Module from "../../module";
import hooks from "../../../hooks";
import stores from "../../../utils/stores";

export default class SpoofBlock extends Module {
    constructor() {
        super("SpoofBlock", "Misc", {
            "Block ID": 652
        });
        
    }

    onRender() {
        hooks.gameWorld.player.currentInventoryItemId = this.options["Block ID"];
    }
}