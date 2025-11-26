import hooks from "../../../hooks";
import packets from "../../../packets";
import Module from "../../module";

export default class NoHunger extends Module {
    constructor() {
        super("NoHunger", "Misc", null);
    }

    onEnable() {
        packets.listeners["NoHunger"] = function (packetID, data) {
            if (packetID == packets.toServer.TIME_STEP_INFO) {
                if (data.m) delete data.m;
                if (data.s) delete data.s;
                if (data.j) delete data.j;
            }
        };
    }

    onDisable() {
        delete packets.listeners["NoHunger"];
    }
}