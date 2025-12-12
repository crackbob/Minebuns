import Module from "../../module";
import hooks from "../../../hooks";

export default class Speed extends Module {
    constructor () {
        super("Speed", "Movement", {
            "Speed": 15
        })
    }

    get playerPhysicsSystem () {
        return hooks.gameWorld.systemsManager.activeSystems.find(sys => sys?.playerPhysicsSystem).playerPhysicsSystem;
    }

    resetMovementSpeed () {
        hooks.gameWorld.player.velocity.moveSpeed = 4.5;
        hooks.gameWorld.player.velocity.fastMoveSpeed = 6.4;
    }

    onRender () {
        if (!hooks?.gameWorld?.player) return;

        if (hooks.gameWorld.player.collision.isGrounded) {
            hooks.gameWorld.player.velocity.moveSpeed = this.options["Speed"];
            hooks.gameWorld.player.velocity.fastMoveSpeed = this.options["Speed"];
        } else {
            this.resetMovementSpeed();
        }
    }

    onEnable () {
        let minY = 0;
        let maxY = 0;
        this.playerPhysicsSystem.BB.min.__defineGetter__("y", () => minY - 0.1);
        this.playerPhysicsSystem.BB.max.__defineGetter__("y", () => maxY - 0.1);
        this.playerPhysicsSystem.BB.min.__defineSetter__("y", (v) => { minY = v })
        this.playerPhysicsSystem.BB.max.__defineSetter__("y", (v) => { maxY = v })
    }

    onDisable () {
        this.resetMovementSpeed();
        delete this.playerPhysicsSystem.BB.min.y;
        delete this.playerPhysicsSystem.BB.max.y;
    }
};