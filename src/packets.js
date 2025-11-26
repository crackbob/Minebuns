import events from "./events"
import hooks from "./hooks";

export default {
    toServer: {
        TIME_STEP_INFO: 1,
        GOT_DAMAGE: 27
    },

    listeners: {},

    packetListener (packetID, data) {
        Object.values(this.listeners).forEach(listener => {
            let result = listener(packetID, data);
            if (result !== null && result !== undefined) {
                data = result;
            }
        });
        hooks.gameWorld.server.msgsToSend.push(packetID, data);
    },

    init () {
        events.on("render", () => {
            if (!hooks?.gameWorld?.server?.sendData) return;
            hooks.gameWorld.server.sendData = this.packetListener.bind(this);
        });
    }
}