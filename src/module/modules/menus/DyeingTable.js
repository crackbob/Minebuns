import Module from "../../module";
import hooks from "../../../hooks";
import gameUtils from "../../../utils/gameUtils";
import moduleManager from "../../moduleManager";

export default class DyeingTable extends Module {
    constructor() {
        super("DyeingTable", "Menus");
    }

    onEnable() {
        gameUtils.openOtherItem(9);
        this.disable();
        moduleManager.modules["ClickGUI"].onDisable(false);
    }
}