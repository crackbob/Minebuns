import Module from "../../module";
import hooks from "../../../hooks";

export default class Scaffold extends Module {
    constructor () {
        super("Scaffold", "Movement", null)
    }

    onRender () {     
        let blockPos = Object.values(hooks.gameWorld.player.position).splice(0, 3).map(Math.floor);
        
        blockPos[1]--;

        let holdingBlockID = hooks.gameWorld.player.currentInventoryItemId;
        let blockUnderID = hooks.gameWorld.chunkManager.getBlock(...blockPos);
        let replaceable = hooks.gameWorld.items[blockUnderID]?.replaceable || false;
        
        if ((blockUnderID == 0 || replaceable) && holdingBlockID) {
            hooks.gameWorld.chunkManager.setBlock(...blockPos, holdingBlockID, true, true);
        }
    }
};