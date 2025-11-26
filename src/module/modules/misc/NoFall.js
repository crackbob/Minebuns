import hooks from "../../../hooks";
import packets from "../../../packets";
import Module from "../../module";

export default class NoFall extends Module {
    constructor() {
        super("NoFall", "Movement", null);
    }

    onEnable() {
        let gameWorld = hooks.stores.get("gameState").gameWorld;
        gameWorld.server.sendData = function (packetID, data) {
            if (packetID == packets.toServer.TIME_STEP_INFO) {
                if (data.lp) {
                    let yVel = data.lp[3];
                    if (yVel < 0) data.lp[3] = -0.01;
                }
            }
            this.msgsToSend.push(packetID, data);
        }
    }

    onDisable() {
        let gameWorld = hooks.stores.get("gameState").gameWorld;
        gameWorld.server.sendData = function (packetID, data) {
            this.msgsToSend.push(packetID, data);
        }
    }
}