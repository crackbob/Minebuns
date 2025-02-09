import ModuleSettings from "./ModuleSettings.js";

export default class Panel {
    constructor(title, position = { top: "200px", left: "200px" }) {
        this.panel = document.createElement("div");
        this.panel.className = "gui-panel";
        this.panel.style.top = position.top;
        this.panel.style.left = position.left;
        
        this.header = document.createElement("div");
        this.header.className = "gui-header";
        this.header.textContent = title;
        this.panel.appendChild(this.header);
        
        document.body.appendChild(this.panel);
        this.buttons = [];
        this.setupDragHandling();
    }

    setupDragHandling() {
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        this.header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offset.x = e.clientX - this.panel.offsetLeft;
            offset.y = e.clientY - this.panel.offsetTop;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            this.panel.style.left = (e.clientX - offset.x) + "px";
            this.panel.style.top = (e.clientY - offset.y) + "px";
        });

        document.addEventListener("mouseup", () => isDragging = false);
    }

    addButton(module) {
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "gui-button-container";

        const btn = document.createElement("div");
        btn.className = `gui-button ${module.isEnabled ? "enabled" : ""}`;
        btn.textContent = module.name;

        const settings = new ModuleSettings(module, buttonContainer);

        btn.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                module.toggle();
                btn.classList.toggle("enabled", module.isEnabled);
            }
            if (event.button === 1) {
                btn.textContent = "waiting for bind..";
                module.waitingForBind = true;
            }
        });

        btn.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            settings.initialize();
            settings.toggle();
        });

        btn.setAttribute("tabindex", -1);
        btn.addEventListener("keydown", (event) => {
            btn.textContent = module.name;
            if (module.waitingForBind) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                if (event.key === "Escape") {
                    module.keybind = null;
                } else {
                    module.keybind = String(event.code);
                }
                module.waitingForBind = false;
            }
        });

        buttonContainer.appendChild(btn);
        this.panel.appendChild(buttonContainer);
        this.buttons.push(btn);
        return btn;
    }

    show() {
        this.panel.style.display = "block";
    }

    hide() {
        this.panel.style.display = "none";
    }
}
