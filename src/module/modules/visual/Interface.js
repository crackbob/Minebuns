import Module from "../../module";

export default class Interface extends Module {
    constructor() {
        super("Interface", "Visual", {
            "Hide Right Elements": true,
            "Bottom Chat": true,
        });
    }

    getCssRule(selector) {
        for (const sheet of document.styleSheets) {
            for (const rule of sheet.cssRules || []) {
                if (rule.selectorText?.includes(selector)) {
                    return rule;
                }
            }
        }
    }

    applyTweaks (key, value) {
        let enabled = this.isEnabled;
        let chatRule = this.getCssRule("chat-wrapper");
        let topRightRule = this.getCssRule("key-prompt-wrapper");

        if (enabled && this.options["Hide Right Elements"]) {
            topRightRule.style.display = "none";
        } else {
            topRightRule.style.display = "flex";
        }

        if (enabled && this.options["Bottom Chat"]) {
            chatRule.style.bottom = "10%";
            chatRule.style.top = "";
            chatRule.style.position = "fixed";
        } else {
            chatRule.style.bottom = "";
            chatRule.style.top = "0";
            chatRule.style.position = "absolute";
        }
    }

    onEnable() {
        this.applyTweaks();
    }

    onDisable() {
        this.applyTweaks();
    }
}