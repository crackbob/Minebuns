import Module from "../../module";
import hooks from "../../../hooks";
import packets from "../../../packets";

export default class SelfHarm extends Module {
    constructor() {
        super("SelfHarm", "Misc", {
            Amount: 1
        });
    }

    onEnable() {
        hooks.gameWorld.server.msgsToSend.push(packets.toServer.GOT_DAMAGE, parseFloat(this.options.Amount));
        this.disable();
    }
}