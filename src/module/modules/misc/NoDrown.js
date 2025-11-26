import hooks from "../../../hooks";
import packets from "../../../packets";
import Module from "../../module";

export default class NoDrown extends Module {
    constructor() {
        super("NoDrown", "Misc", null);
    }

    get damageListener () {
        return hooks.gameWorld.eventEmitter._events.get(48).values().next().value;
    }

    onRender() {
        if (!hooks?.gameWorld?.eventEmitter?._events) return;
        if (!this.damageListener.callback.toString().includes("damageToApply")) return;
        this.damageListener.callback = () => {};
    }

    onDisable() {
        if (!hooks?.gameWorld?.eventEmitter?._events) return;
        this.damageListener.callback = (i) => {
            this.damageToApply += i;
        };
    }
}