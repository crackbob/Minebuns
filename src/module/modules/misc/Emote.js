import Module from "../../module";
import hooks from "../../../hooks";

export default class Emote extends Module {
    constructor() {
        super("Emote", "Misc", {
            "Emote name": "No",
            "Infinity": false
        });
    }

    onEnable() {
        hooks.stores.roomState.ws.sendData(77, {
            name: this.options["Emote name"],
            infinity: this.options["Infinity"]
        })
    }
}