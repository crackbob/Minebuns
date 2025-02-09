import Module from "../../module";
import moduleManager from "../../moduleManager";
import events from "../../../events"

export default class ArrayList extends Module {
    constructor () {
        super("Arraylist", "Visual");
        this.namesMap = {};
        this.arraylistContainer = null;
        this.initialized = false;
    }

    update(name, enabled) {
        if (enabled) {
            if (!this.namesMap[name]) {
                let moduleElement = document.createElement("div");
                moduleElement.style.backgroundColor = "rgba(10, 10, 10, 0.7)";
                moduleElement.style.color = "white";
                moduleElement.style.padding = "2px 10px 2px 10px";
                moduleElement.style.display = "flex";
                moduleElement.style.alignItems = "center";
                moduleElement.style.boxSizing = "border-box";
                moduleElement.style.margin = "0";
                moduleElement.style.fontFamily = "'Product Sans', sans-serif";
                moduleElement.style.boxShadow = "rgb(0, 0, 0, 0.05) -5px 1px";
                moduleElement.style.transition = "max-height 0.2s ease-in-out, opacity 0.2s ease-in-out";
                moduleElement.style.overflow = "hidden";
                moduleElement.style.maxHeight = "0";
                moduleElement.style.opacity = "0";

                let textElem = document.createElement("span");
                textElem.style.fontWeight = "800";
                textElem.style.fontSize = "16px";
                textElem.style.backgroundImage = "var(--Minebuns-accent-color)";
                textElem.style.color = "transparent";
                textElem.style.backgroundClip = "text";
                textElem.innerHTML = name;
                moduleElement.appendChild(textElem);

                this.arraylistContainer.appendChild(moduleElement);
                
                setTimeout(() => {
                    moduleElement.style.maxHeight = "50px";
                    moduleElement.style.opacity = "1";
                }, 1);

                this.namesMap[name] = moduleElement;
            }
        } else {
            if (this.namesMap[name]) {
                const moduleElement = this.namesMap[name];
                moduleElement.style.maxHeight = "0";
                moduleElement.style.opacity = "0";

                setTimeout(() => {
                    this.arraylistContainer.removeChild(moduleElement);
                    delete this.namesMap[name];
                }, 5);
            }
        }

        const sortedElements = Object.values(this.namesMap).sort((a, b) => this.measureElementWidth(b) - this.measureElementWidth(a));
        this.arraylistContainer.innerHTML = '';

        sortedElements.forEach(element => {
            this.arraylistContainer.appendChild(element);
        });
    }

    onEnable() {
        if (!this.initialized) {
            this.arraylistContainer = document.createElement("div");
            this.arraylistContainer.style.flexDirection = "column";
            this.arraylistContainer.style.position = "absolute";
            this.arraylistContainer.style.zIndex = "1000";
            this.arraylistContainer.style.display = "flex";
            this.arraylistContainer.style.right = "5px";
            this.arraylistContainer.style.top = "5px";
            this.arraylistContainer.style.alignItems = "flex-end";
            this.arraylistContainer.style.pointerEvents = "none";
            this.arraylistContainer.style.textTransform = "lowercase";

            this.arraylistContainer.style.border = "2px solid transparent";
            this.arraylistContainer.style.borderImage = "var(--Minebuns-accent-color)";
            this.arraylistContainer.style.borderImageSlice = "1";
            this.arraylistContainer.style.borderBottom = "0";
            this.arraylistContainer.style.borderLeft = "0";

            document.body.appendChild(this.arraylistContainer);

            events.on("module.update", (module) => {
                this.update(module.name, module.isEnabled);
            });

            this.initialized = true;
        } else {
            this.arraylistContainer.style.opacity = "1";
        }
    }

    measureElementWidth(element) {
        return element.getBoundingClientRect().width;
    }

    onDisable() {
        this.arraylistContainer.style.opacity = "0";
    }
}