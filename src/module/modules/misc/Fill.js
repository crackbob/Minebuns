import Module from "../../module";
import hooks from "../../../hooks";
import moduleManager from "../../moduleManager";

export default class Fill extends Module {
    constructor() {
        super("Fill", "Misc", {
            "Radius": 4,
            "Block ID": 652,
            "Chunk Interval": 500
        });
        this.lastExecutionTime = 0;
    }

    onRender() {
        let radius = this.options["Radius"];
        const interval = this.options["Chunk Interval"];
        const currentTime = Date.now();

        if (currentTime - this.lastExecutionTime >= interval) {
            this.lastExecutionTime = currentTime;

            let blockPos = Object.values(hooks.gameWorld.player.position).splice(0, 3).map(Math.floor);

            for (let x = -radius; x <= radius; x++) {
                for (let y = -radius; y <= radius; y++) {
                    for (let z = -radius; z <= radius; z++) {
                        const [cx, cy, cz] = [blockPos[0] + x, blockPos[1] + y, blockPos[2] + z];
                        if (hooks.gameWorld.chunkManager.getBlock(cx, cy, cz) == 0) {
                            hooks.gameWorld.chunkManager.setBlock(cx, cy, cz, this.options["Block ID"], true, true);
                        }
                    }
                }
            }
        }
    }
}