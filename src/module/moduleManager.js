import events from "../events";
import ArrayList from "./modules/visual/Arraylist";
import hooks from "../hooks";

import Watermark from "./modules/visual/Watermark";
import ClickGUI from "./modules/visual/ClickGUI";
import Airjump from "./modules/movement/Airjump";
import Instabreak from "./modules/misc/Instabreak";
import Nuker from "./modules/misc/Nuker";
import AdBypass from "./modules/misc/AdBypass";
import Fly from "./modules/movement/Fly";
import Speed from "./modules/movement/Speed";
import FreeHeadcoins from "./modules/misc/FreeHeadcoins";
import Fill from "./modules/misc/Fill";
import Chams from "./modules/visual/Chams";
import FOVChanger from "./modules/visual/FOVChanger";
import Scaffold from "./modules/movement/Scaffold";
import Killaura from "./modules/combat/Killaura";
import GunModifier from "./modules/combat/GunModifier";
import Aimbot from "./modules/combat/Aimbot";
import NoClip from "./modules/movement/NoClip";
import Timer from "./modules/misc/Timer";
import NoFall from "./modules/movement/NoFall";
import HighJump from "./modules/movement/HighJump";
import NoHunger from "./modules/misc/NoHunger";
import NoDrown from "./modules/misc/NoDrown";
import GroundSpeed from "./modules/movement/GroundSpeed";

export default {
    modules: {},
    addModules: function (...modules) {
        for(const module of modules) {
            let moduleInstance = new module;
            this.modules[moduleInstance.name] = moduleInstance;
        }
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
            ArrayList,
            Watermark,
            ClickGUI,
            Airjump,
            Instabreak,
            Nuker,
            AdBypass,
            Fly,
            Speed,
            GroundSpeed,
            FreeHeadcoins,
            Fill,
            Chams,
            FOVChanger,
            Scaffold,
            Killaura,
            GunModifier,
            Aimbot,
            NoClip,
            Timer,
            NoFall,
            HighJump,
            NoHunger,
            NoDrown
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