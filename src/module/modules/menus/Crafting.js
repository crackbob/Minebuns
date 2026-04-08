import Module from "../../module";
import hooks from "../../../hooks";
import gameUtils from "../../../utils/gameUtils";
import moduleManager from "../../moduleManager";

export default class Crafting extends Module {
    constructor() {
        super("Crafting", "Menus");
    }

    onEnable() {
        gameUtils.openOtherItem(2);
        this.disable();
        moduleManager.modules["ClickGUI"].onDisable(false);
    }
}