import Module from "../../module";
import hooks from "../../../hooks";
import moduleManager from "../../moduleManager";

export default class FreeHeadcoins extends Module {
    constructor() {
        super("FreeHeadcoins", "Misc");
    }

    onEnable() {
        hooks.network.get("/users/freeHeadcoins");
        hooks.stores.userState.user.balance.headcoins += 10;
        moduleManager.modules["FreeHeadcoins"].disable();
    }
}