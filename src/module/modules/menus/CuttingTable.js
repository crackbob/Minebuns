import Module from "../../module";
import hooks from "../../../hooks";
import gameUtils from "../../../utils/gameUtils";
import moduleManager from "../../moduleManager";

export default class CuttingTable extends Module {
    constructor() {
        super("CuttingTable", "Menus");
    }

    onEnable() {
        gameUtils.openOtherItem(10);
        this.disable();
        moduleManager.modules["ClickGUI"].onDisable(false);
    }
}