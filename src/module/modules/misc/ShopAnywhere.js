import Module from "../../module";
import hooks from "../../../hooks";

export default class ShopAnywhere extends Module {
    constructor() {
        super("ShopAnywhere", "Misc");
    }

    get npcSystem () {
        return hooks?.gameWorld?.systemsManager?.activeSystems.find(sys => sys?.isPlayerInShoppingZone);
    }

    onRender() {
        if (!hooks?.gameWorld?.player && !this?.npcSystem?.isPlayerInShoppingZone) return;

        this._og = this._og || this.npcSystem.isPlayerInShoppingZone;

        if (this.npcSystem.isPlayerInShoppingZone == this._og) {
            this.npcSystem.isPlayerInShoppingZone = () => true;
        }
    }

    onDisable() {
        this.npcSystem.isPlayerInShoppingZone = this._og;
    }
}