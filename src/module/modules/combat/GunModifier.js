import Module from "../../module";
import hooks from "../../../hooks";

export default class GunModifier extends Module {
    constructor() {
        super("GunModifier", "Combat", {
            "Spread": 0.5,
            "Bullets per shot": 100,
            "Firerate (ms)": 1,
            "Bullet distance": 1000,
            "Reload Time": 1,
            "Recoil": false
        });
    }

    get gunSystem () {
        return hooks.gameWorld.systemsManager.activeSystems.find(system => system?.bulletsSystem);
    }

    onEnable() {
        let weapon = this.gunSystem.playerShooter.currPlayerWeaponSpec;
        weapon.bulletsPerShot = this.options["Bullets per shot"];
        weapon.firerateMs = this.options["Firerate (ms)"];
        weapon.distance = this.options["Bullet distance"];
        weapon.startSpread = this.options["Spread"];
        weapon.reloadTimeMs = this.options["Reload Time"];

        if (!this.options["Recoil"]) {
            weapon.recoilAttackY = 0;
            weapon.recoilAttackY = 0;
        }
    }
}