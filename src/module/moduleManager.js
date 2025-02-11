import events from "../events";
import ArrayList from "./modules/visual/Arraylist";
import hooks from "../hooks";

import Watermark from "./modules/visual/Watermark";
import ClickGUI from "./modules/visual/ClickGUI";
import Airjump from "./modules/movement/Airjump";
import Instabreak from "./modules/misc/Instabreak";
import SpoofBlock from "./modules/misc/SpoofBlock";
import Nuker from "./modules/misc/Nuker";
import Emote from "./modules/misc/Emote";
import AdBypass from "./modules/misc/AdBypass";
import Velocity from "./modules/movement/Velocity";
import NoHitDelay from "./modules/combat/NoHitDelay";
import Fly from "./modules/movement/Fly";
import NoFall from "./modules/movement/NoFall";
import Speed from "./modules/movement/Speed";
import FreeHeadcoins from "./modules/misc/FreeHeadcoins";
import Fill from "./modules/misc/Fill";
import Chams from "./modules/visual/Chams";

export default {
    modules: {},
    addModules: function (...modules) {
        for(const module of modules) this.modules[module.name] = module;
    },
    addModule: function (module) {
        this.modules[module.name] = module;
    },
    handleKeyPress: function (key) {
        for (let name in this.modules) {
            let module = this.modules[name];

            if (module.waitingForBind) {
                module.keybind = key;
                module.waitingForBind = false;
                
            } else if (module.keybind == key) {
                module.toggle();
            }
        }
    },

    init () {
        this.addModules(
            new ArrayList(),
            new Watermark(),
            new ClickGUI(),
            new Airjump(),
            new Instabreak(),
            new SpoofBlock(),
            new Nuker(),
            new Emote(),
            new AdBypass(),
            new Velocity(),
            new NoHitDelay(),
            new Fly(),
            new NoFall(),
            new Speed(),
            new FreeHeadcoins(),
            new Fill(),
            new Chams()
        );

        events.on("render", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onRender();
                }
            }
        });

        events.on("keydown", this.handleKeyPress.bind(this));
        events.on("setting.update", () => {
            for (let name in this.modules) {
                if (this.modules[name].isEnabled) {
                    this.modules[name].onSettingUpdate();
                }
            }
        });

        
        this.modules["Arraylist"].enable();
        this.modules["Watermark"].enable();
    }
};