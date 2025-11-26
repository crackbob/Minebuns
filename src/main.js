import moduleManager from "./module/moduleManager";
import events from "./events";
import hooks from "./hooks"
import packets from "./packets";

class Minebuns {
    constructor() {
        this.version = "1.0.0";
        this.init();
    }

    init () {
        setInterval(() => {
            events.emit("render");
        }, (1000 / 60));

        document.addEventListener("keydown", (e) => {
            events.emit("keydown", e.code);
        });

        moduleManager.init();
        packets.init();

        this.packets = packets;
        this.moduleManager = moduleManager;
        this.hooks = hooks;
    }

    disable () {

    }
};

window.minebuns = new Minebuns();