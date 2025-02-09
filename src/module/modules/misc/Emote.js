import Module from "../../module";
import hooks from "../../../hooks";
import stores from "../../../utils/stores";

export default class Emote extends Module {
    constructor() {
        super("Emote", "Misc", {
            "Emote name": "No",
            "Infinity": false
        });
    }

    onEnable() {
        stores.roomMgrStore.ws.sendData(77, {
            name: this.options["Emote name"],
            infinity: this.options["Infinity"]
        })
    }
}