import Module from "../../module";
import hooks from "../../../hooks";

export default class Velocity extends Module {
    constructor () {
        super("Velocity", "Movement", null)
    }

    get serverPacketHandlers () {
        return hooks.gameWorld.server.msgsListeners
    }

    get velocityPacket () {
        return Object.keys(this.serverPacketHandlers).find(key => this.serverPacketHandlers[key].toString().includes('velocity'));
    }

    onEnable () {
        this.velocityHandler = this.velocityHandler || this.serverPacketHandlers[this.velocityPacket];
        this.serverPacketHandlers[this.velocityPacket] = () => {};
    }

    onDisable () {
        this.serverPacketHandlers[this.velocityPacket] = this.velocityHandler;
    }
};