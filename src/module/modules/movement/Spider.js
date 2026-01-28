import Module from "../../module";
import hooks from "../../../hooks";

export default class Spider extends Module {
    constructor() {
        super("Spider", "Movement", {
            "Speed": 5
        });
    }

    get playerPhysicsSystem () {
        return hooks.gameWorld.systemsManager.activeSystems.find(sys => sys?.playerPhysicsSystem).playerPhysicsSystem;
    }

    get upAgainstWall() {
        return this.playerPhysicsSystem.playerVelVec3.x == 0 || this.playerPhysicsSystem.playerVelVec3.z == 0;
    }

    onRender() {
        if (!hooks?.gameWorld?.player) return;

        if (hooks?.gameWorld?.player?.inputs.jump && this.upAgainstWall) {
            hooks.gameWorld.player.velocity.velVec3.y = this.options["Speed"];
        }
    }
}