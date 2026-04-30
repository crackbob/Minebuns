import Module from "../../module";
import hooks from "../../../hooks";
import gameUtils from "../../../utils/gameUtils";

export default class BlockOutline extends Module {
    constructor () {
        super("BlockOutline", "Visual", {
            "Outline Color": "#81e1ff",
        })
    }

    get selectedBlock () {
        return hooks.gameWorld?.systemsManager.activeSystems.find(sys => sys?.currBlockPos !== undefined) || undefined;
    }

    onRender () {
        if (this?.selectedBlock?.mesh) {
            let selectedColor = gameUtils.hexToRgb(this.options["Outline Color"]);
            
            if (this.selectedBlock.mesh.material.color.r !== selectedColor.r) {
                this.onEnable();
            }
        }
    }

    onEnable () {
        let selectedColor = gameUtils.hexToRgb(this.options["Outline Color"]);
        let selectedBlockMesh = this.selectedBlock.mesh;
        Object.keys(selectedColor).forEach(function (key) {
            selectedBlockMesh.material.color[key] = selectedColor[key];
        })
    }

    onDisable () {
        this.selectedBlock.mesh.material.color.r = 0;
        this.selectedBlock.mesh.material.color.g = 0;
        this.selectedBlock.mesh.material.color.b = 0;
    }
};