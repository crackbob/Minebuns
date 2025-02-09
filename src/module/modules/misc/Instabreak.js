import Module from "../../module";
import hooks from "../../../hooks";

export default class Instabreak extends Module {
    constructor() {
        super("Instabreak", "Misc", null);
        this.originalHardness = new Map();
    }

    onEnable() {
        Object.values (hooks.gameWorld.items).forEach((block) => {
            if (block?.destruction) {
                if (!this.originalHardness.has(block)) {
                    this.originalHardness.set(block, block.destruction.durability);
                }
                block.destruction.durability = 0;
            }
        });
    }

    onDisable() {
        Object.values(hooks.gameWorld.items).forEach((block) => {
            if (block?.destruction && this.originalHardness.has(block)) {
                block.destruction.durability = this.originalHardness.get(block);
            }
        });
    }
}