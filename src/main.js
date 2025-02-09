import moduleManager from "./module/moduleManager";
import events from "./events";
import hooks from "./hooks"
import stores from "./utils/stores";

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

        hooks.init();
        moduleManager.init();

        window.hooks = hooks;
        window.stores = stores;
    }

    disable () {

    }
};

export default new Minebuns();