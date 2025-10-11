import Module from "../../module";
import hooks from "../../../hooks";

export default class Timer extends Module {
    constructor() {
        super("Timer", "Movement", {
            "Multiplier": 1.2
        });
        this.interval = null;
    }

    onEnable() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => {
            const time = hooks.stores.gameState.gameWorld.time;
            time.elapsedTimeMs += 20 * this.options.Multiplier;
        }, 20);
    }

    onDisable() {
        if (this.interval) clearInterval(this.interval);
    }
}