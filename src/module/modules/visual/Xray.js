import Module from "../../module";
import hooks from "../../../hooks";

export default class Xray extends Module {
    constructor () {
        super("Xray", "Visual", null)
    }

    getItemByName(name) {
        return Object.values(hooks.gameWorld.items).find(item => item.name == name);
    }

    blocksToXray = ["Dirt", "Cobblestone", "Stone"];

    onEnable () {
        $assetsUrls['game/textures/blocksTextures/Transparent.png'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

        this.blocksToXray.forEach(blockName => {
            let block = this.getItemByName(blockName);
            if (!block) return;

            block.transparent = true;
            block.textures = {"other": "Transparent"};
            block.lightRadius = 15;
            block.lightRGB = [1, 1, 1];
        })

        this.reloadLighting();
        alert("Rejoin game to apply");
    }

    onDisable () {
        this.blocksToXray.forEach(blockName => {
            let block = this.getItemByName(blockName);
            if (!block) return;

            block.transparent = false;
            block.textures = {"other": blockName};
            block.lightRadius = 0;
            block.lightRGB = [0, 0, 0];
        })

        this.reloadLighting();
    }

    reloadLighting() {
        if (hooks.gameWorld.chunkManager) {
            hooks.gameWorld.chunkManager.lightConfig.byBlockId = [];
            hooks.gameWorld.chunkManager.lightConfig.reloadBlocks();
        }
    }
};