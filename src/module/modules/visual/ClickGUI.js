import Module from "../../module.js";
import moduleManager from "../../moduleManager.js";
import events from "../../../events";
import Panel from "./components/Panel.js";
import "./styles/clickgui.css";

export default class ClickGUI extends Module {
    constructor() {
        super("ClickGUI", "Visual", {
            "Accent Color 1": "rgb(64, 190, 255)",
            "Accent Color 2": "rgb(129, 225, 255)",
            "Button Color": "rgb(40, 40, 40, 0.9)",
            "Hover Color": "rgb(50, 50, 50, 0.9)",
            "Header Color": "rgb(0, 0, 0, 0.85)",
            "Panel Color": "rgb(18 18 18)",
            "Text Color": "#ffffff",
            "Enable Animations": true
        }, "ShiftRight");

        this.GUILoaded = false;
        this.panels = [];
        this.blurredBackground = null;
        this.updateColors();
    }

    updateAnimations() {
        if (this.options["Enable Animations"]) {
            document.body.classList.add("with-animations");
        } else {
            document.body.classList.remove("with-animations");
        }
    }

    updateColors() {
        document.body.style.setProperty('--Minebuns-accent-color', 
            `linear-gradient(90deg, ${this.options["Accent Color 1"]} 0%, ${this.options["Accent Color 2"]} 100%)`);
        document.body.style.setProperty('--button-color', this.options["Button Color"]);
        document.body.style.setProperty('--hover-color', this.options["Hover Color"]);
        document.body.style.setProperty('--header-bg', this.options["Header Color"]);
        document.body.style.setProperty('--panel-bg', this.options["Panel Color"]);
        document.body.style.setProperty('--text-color', this.options["Text Color"]);
    }

    onEnable() {
        document.pointerLockElement && document.exitPointerLock();

        if (!this.GUILoaded) {
            this.setupBackground();
            this.createPanels();
            this.setupEventListeners();
            this.GUILoaded = true;
            this.updateAnimations();
        } else {
            this.showGUI();
            this.updateAnimations();
        }
    }

    setupBackground() {
        this.blurredBackground = document.createElement("div");
        this.blurredBackground.className = "gui-background";
        document.body.appendChild(this.blurredBackground);
    }

    createPanels() {
        const panelConfigs = [
            { title: "Combat", position: { top: "100px", left: "100px" } },
            { title: "Movement", position: { top: "100px", left: "320px" } },
            { title: "Visual", position: { top: "100px", left: "540px" } },
            { title: "Misc", position: { top: "100px", left: "760px" } }
        ];

        this.panels.forEach(panel => {
            if (panel.panel && panel.panel.parentNode) {
                panel.panel.parentNode.removeChild(panel.panel);
            }
        });
        this.panels = [];

        panelConfigs.forEach(config => {
            const panel = new Panel(config.title, config.position);
            this.panels.push(panel);
        });

        const modulesByCategory = {};
        Object.values(moduleManager.modules).forEach(module => {
            if (!modulesByCategory[module.category]) {
                modulesByCategory[module.category] = [];
            }
            modulesByCategory[module.category].push(module);
        });

        Object.entries(modulesByCategory).forEach(([category, modules]) => {
            const panel = this.panels.find(p => p.header.textContent === category);
            if (!panel) return;

            modules.sort((a, b) => b.name.length - a.name.length);
            modules.forEach(module => panel.addButton(module));
        });
    }

    setupEventListeners() {
        events.on("module.update", (module) => {
            const panel = this.panels.find(p => p.header.textContent === module.category);
            if (!panel) return;
            
            const button = panel.buttons.find(btn => btn.textContent === module.name);
            if (button) button.classList.toggle("enabled", module.isEnabled);
        });
    }

    showGUI() {
        this.panels.forEach(panel => panel.show());
        this.blurredBackground.style.display = "block";
    }

    onDisable() {
        this.panels.forEach(panel => panel.hide());
        this.blurredBackground.style.display = "none";
    }

    onSettingUpdate() {
        this.updateColors();
        this.updateAnimations();
    }
}