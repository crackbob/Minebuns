import Module from "../../module";
import hooks from "../../../hooks";
import packets from "../../../packets";

export default class InstantRespawn extends Module {
    constructor() {
        super("InstantRespawn", "Misc");
    }

    get gamemode () {
        return location.pathname.replace("/match/", "");
    }

    onRender() {
        if (hooks.gameWorld?.player.isAlive) return;

        let respawning = false;

        switch (this.gamemode) {
            case "one-block": {
                hooks.gameWorld.server.sendData(packets.toServer.ONE_BLOCK_REQUEST_RESPAWN, true);
                respawning = true;
            }

            case "parkour": {
                hooks.gameWorld.server.sendData(packets.toServer.PARKOUR_REQUEST_RESPAWN, true);
                respawning = true;
            }

            case "bedwars": {
                hooks.gameWorld.server.sendData(packets.toServer.BED_WARS_REQUEST_RESPAWN, true);
                respawning = true;
            }

            case "survival": {
                hooks.gameWorld.server.sendData(packets.toServer.SANDBOX_REQUEST_RESPAWN, true);
                respawning = true;
            }
        }

        if (respawning) hooks.stores.get("gameState").setLayoutState(0);
    }
}