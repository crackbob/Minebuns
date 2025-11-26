import hooks from "../../../hooks";
import packets from "../../../packets";
import Module from "../../module";

export default class NoFall extends Module {
    constructor() {
        super("NoFall", "Movement", null);
    }

    onEnable() {
        packets.listeners["NoFall"] = function (packetID, data) {
            if (packetID == packets.toServer.TIME_STEP_INFO) {
                if (data.lp) {
                    let yVel = data.lp[3];
                    if (yVel > 0) data.lp[3] *= 0.01;
                    if (yVel < 0) data.lp[3] = -0.01;
                    if (yVel == 0) data.lp[3] = -0.01;
                }
            }
        }
    }

    onDisable() {
        delete packets.listeners["NoFall"];
    }
}