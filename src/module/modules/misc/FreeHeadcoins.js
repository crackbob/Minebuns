import Module from "../../module";
import hooks from "../../../hooks";
import stores from "../../../utils/stores";
import moduleManager from "../../moduleManager";

export default class FreeHeadcoins extends Module {
    constructor() {
        super("FreeHeadcoins", "Misc");
        
    }

    onEnable() {
        hooks.networkService.get("/users/freeHeadcoins");
        stores.userStore.user.balance.headcoins += 10;
        moduleManager.modules["FreeHeadcoins"].disable();
    }
}