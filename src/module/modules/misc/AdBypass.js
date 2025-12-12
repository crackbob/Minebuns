import Module from "../../module";
import hooks from "../../../hooks";

export default class AdBypass extends Module {
    constructor() {
        super("AdBypass", "Misc");
    }

    onEnable() {
        this._reward = this._reward || hooks.stores.get("adsStore").rewardCommercialVideoWrapper;
        hooks.stores.get("adsStore").rewardCommercialVideoWrapper = () => true;
    }

    onDisable() {
        hooks.stores.get("adsStore").rewardCommercialVideoWrapper = () => this._reward;
    }
}