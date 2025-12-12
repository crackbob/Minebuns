import Module from "../../module";
import hooks from "../../../hooks";
import moduleManager from "../../moduleManager";

export default class FreeHeadcoins extends Module {
    constructor() {
        super("FreeHeadcoins", "Misc");
    }

    async onEnable () {
        let resp = await hooks.network.get("users/freeSpinner");
        hooks.stores.get("userState").user.balance.headcoins += resp.data.amount;
        moduleManager.modules["FreeHeadcoins"].disable();
    }
}