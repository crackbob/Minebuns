import Module from "../../module";
import hooks from "../../../hooks";
import moduleManager from "../../moduleManager";

export default class Nuker extends Module {
    constructor() {
        super("Nuker", "Misc", {
            "Radius": 4,
            "Delay": 120,
            "Target Selected Block": false,
            "Auto Disable": false
        });
        this.blockIndex = 0;
    }

    get selectedBlock () {
        return hooks.gameWorld?.systemsManager.activeExecuteSystems.find(sys => sys?.currBlockPos !== undefined) || undefined;
    }

    onDisable() {
        this.blockIndex = 0;
    }

    onEnable() {
        this.blockIndex = 0;
        let radius = this.options["Radius"];
        let blockUnderPlayer = Object.values(hooks.gameWorld.player.position).map(Math.floor);
        blockUnderPlayer[1]--;

        if (this.options["Target Selected Block"] && this.selectedBlock) {
            blockUnderPlayer = [...this.selectedBlock.currBlockPos];
        }

        let dx = -radius, dy = -radius, dz = -radius;
        let blocks = [];
        
        while (dx <= radius) {
            while (dy <= radius) {
                while (dz <= radius) {
                    if (Math.sqrt(dx * dx + dy * dy + dz * dz) <= radius) {
                        let blockPos = [blockUnderPlayer[0] + dx, blockUnderPlayer[1] + dy, blockUnderPlayer[2] + dz];
                        let blockID = hooks.gameWorld.chunkManager.getBlock(...blockPos);

                        if (blockID !== 0) {
                            blocks.push(blockPos);
                        }
                    }
                    dz++;
                }
                dz = -radius;
                dy++;
            }
            dy = -radius;
            dx++;
        }
        
        let context = this;
        let options = this.options;

        function breakNextBlock() {
            if (!context.isEnabled) return;

            if (context.blockIndex < blocks.length) {
                const [newX, newY, newZ] = blocks[context.blockIndex];
                setTimeout(() => {
                    if (!context.isEnabled) return;

                    hooks.gameWorld.chunkManager.setBlock(newX, newY, newZ, 0, true);
                    context.blockIndex++;
                    breakNextBlock();
                }, options["Delay"]);
            } else {
                context.blockIndex = 0;
                if (options["Auto Disable"]) {
                    context.disable();
                } else {
                    if (context.isEnabled) context.onEnable();
                }
            }
        }

        breakNextBlock();
    }
}