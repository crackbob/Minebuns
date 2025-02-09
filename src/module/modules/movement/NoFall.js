import Module from "../../module";
import hooks from "../../../hooks";

export default class NoFall extends Module {
    constructor () {
        super("NoFall", "Movement")
    }

    onRender () {
        
        // im sorry

        let blockPos = Object.values(hooks.gameWorld.player.position).map(Math.floor);

        blockPos[1]--;
        if (hooks.gameWorld.chunkManager.getBlock(...blockPos) !== 0) {
            hooks.gameWorld.player.velocity.velVec3.y = -0.5;
        }
    }
};