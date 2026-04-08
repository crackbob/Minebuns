import Module from "../../module";
import hooks from "../../../hooks";
import packets from "../../../packets";

export default class AirPlace extends Module {
    constructor () {
        super("AirPlace", "Misc");
    }

    get blockPlaceSystem () {
        return hooks.gameWorld.systemsManager.activeSystems.find(sys => sys?._handlePlaceInAir);
    }

    onEnable () {
        this.blockPlaceSystem.canPlaceBlocksInAir = true;
    }

    onDisable () {
        this.blockPlaceSystem.canPlaceBlocksInAir = hooks.gameWorld.player.gameMode == 2;
    }
};