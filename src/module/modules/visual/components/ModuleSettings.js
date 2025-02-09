import events from "../../../../events";

export default class ModuleSettings {
    constructor(module, container) {
        this.module = module;
        this.container = container;
        this.components = [];
        this.initialized = false;
        this.isOpen = false;
    }

    initialize() {
        if (this.initialized || !this.module?.options) return;
        
        Object.keys(this.module.options).forEach(key => {
            const settingValue = this.module.options[key];
            const settingType = typeof settingValue;

            if (key.toLowerCase().includes("color")) {
                this.addColorPicker(key);
            } else if (settingType === "boolean" || settingValue === "true" || settingValue === "false") {
                this.addCheckbox(key);
            } else if (settingType === "string") {
                this.addStringInput(key);
            } else {
                this.addNumberInput(key);
            }
        });

        this.components.forEach(component => component.style.display = "none");
        this.initialized = true;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.components.forEach(component => {
            component.style.display = this.isOpen ? "flex" : "none";
            if (this.isOpen) {
                this.container.style.marginBottom = "5px";
            } else {
                this.container.style.marginBottom = "0px";
            }
        });
    }

    addNumberInput(name) {
        const container = document.createElement("div");
        container.className = "gui-setting-container";

        const label = document.createElement("span");
        label.className = "gui-setting-label";
        label.textContent = name;

        const input = document.createElement("input");
        input.type = "text";
        input.className = "gui-text-input";
        input.value = this.module.options[name];

        let lastValidValue = input.value;

        input.addEventListener("input", () => {
            const value = input.value.trim();
            if (!isNaN(value) && value !== "") {
                lastValidValue = value;
                this.module.options[name] = value;
                events.emit("setting.update", this.module);
            }
        });

        input.addEventListener("blur", () => {
            if (isNaN(input.value) || input.value.trim() === "") {
                input.value = lastValidValue;
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                input.blur();
            }
        });

        container.appendChild(label);
        container.appendChild(input);
        this.container.appendChild(container);
        this.components.push(container);
    }

    addStringInput(name) {
        const container = document.createElement("div");
        container.className = "gui-setting-container";

        const label = document.createElement("span");
        label.className = "gui-setting-label";
        label.textContent = name;

        const input = document.createElement("input");
        input.type = "text";
        input.className = "gui-text-input";
        input.value = this.module.options[name];

        input.addEventListener("input", () => {
            const value = input.value.trim();
            this.module.options[name] = value;
            events.emit("setting.update", this.module);
        });

        container.appendChild(label);
        container.appendChild(input);
        this.container.appendChild(container);
        this.components.push(container);
    }

    addCheckbox(name) {
        const container = document.createElement("div");
        container.className = "gui-setting-container";

        const label = document.createElement("span");
        label.className = "gui-setting-label";
        label.textContent = name;

        const checkbox = document.createElement("div");
        checkbox.className = "gui-checkbox";
        checkbox.classList.toggle("enabled", this.module.options[name] === true || this.module.options[name] === "true");

        checkbox.addEventListener("click", () => {
            const wasChecked = checkbox.classList.contains("enabled");
            checkbox.classList.toggle("enabled");
            this.module.options[name] = (!wasChecked).toString();
            events.emit("setting.update", this.module);
        });

        container.appendChild(label);
        container.appendChild(checkbox);
        this.container.appendChild(container);
        this.components.push(container);
    }

    addColorPicker(name) {
        const container = document.createElement("div");
        container.className = "gui-setting-container";

        const label = document.createElement("span");
        label.className = "gui-setting-label";
        label.textContent = name;

        const colorPickerBg = document.createElement("div");
        colorPickerBg.className = "gui-color-picker";
        colorPickerBg.style.background = this.module.options[name];

        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.className = "gui-color-input";
        colorPickerBg.appendChild(colorPicker);

        colorPicker.addEventListener("input", (event) => {
            colorPickerBg.style.background = event.target.value;
            this.module.options[name] = event.target.value;
            events.emit("setting.update", this.module);
        });

        container.appendChild(label);
        container.appendChild(colorPickerBg);
        this.container.appendChild(container);
        this.components.push(container);
    }
}
