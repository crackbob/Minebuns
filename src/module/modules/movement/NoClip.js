import Module from "../../module";
import hooks from "../../../hooks";

export default class NoClip extends Module {
    constructor() {
        super("NoClip", "Movement");
    }

    get playerPhysicsSystem () {
        return hooks.gameWorld.systemsManager.activeSystems.find(sys => sys?.playerPhysicsSystem).playerPhysicsSystem;
    }

    onRender() {
        if (!hooks?.gameWorld?.player) return;

        this._og = this._og || this.playerPhysicsSystem.resolveBlockCollision;

        if (this.playerPhysicsSystem.resolveBlockCollision == this._og) {
            this.playerPhysicsSystem.resolveBlockCollision = () => {};
        }
    }

    onDisable() {
        this.playerPhysicsSystem.resolveBlockCollision = () => this._og;
    }
}