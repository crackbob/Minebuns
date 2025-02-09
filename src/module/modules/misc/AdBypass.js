import Module from "../../module";
import hooks from "../../../hooks";
import stores from "../../../utils/stores";

export default class AdBypass extends Module {
    constructor() {
        super("AdBypass", "Misc");
    }

    onEnable() {
        this._reward = this._reward || stores.adsStore.rewardCommercialVideoWrapper;
        stores.adsStore.rewardCommercialVideoWrapper = () => true;
    }

    onDisable() {
        stores.adsStore.rewardCommercialVideoWrapper = () => this._reward;
    }
}