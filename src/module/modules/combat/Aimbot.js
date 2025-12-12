import Module from "../../module";
import hooks from "../../../hooks";
import mathUtils from "../../../utils/mathUtils";

export default class Aimbot extends Module {
    constructor() {
        super("Aimbot", "Combat", {
            "On Aim": "true",
            "On Shoot": "true",
            "Y Offset": 0.5
        });
        this.lastExecutionTime = null;
    }
    
    getClosestEnemy(player, enemies) {
        let closestEnemy = null;
        let closestDistance = Infinity;
    
        enemies.forEach(enemy => {
            if (enemy?.model?.position && enemy.isAlive) {
                let distance = mathUtils.calculateDistance(player.position, enemy.model.position);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
        });
    
        return closestEnemy;
    }
    
    aimAtEnemy() {
        let player = hooks.gameWorld.player;
        let enemies = hooks.gameWorld.server.players;
    
        if (!player || !enemies) return;
    
        let closestEnemy = this.getClosestEnemy(player, enemies);
    
        if (closestEnemy) {
            let enemyPos = closestEnemy.model.position;
            let playerPos = player.position;
    
            let direction = {
                x: enemyPos.x - playerPos.x,
                z: enemyPos.z - playerPos.z,
            };
    
            let rotationY = Math.atan2(direction.x, direction.z);
            
            let headOffset = parseFloat(this.options["Y Offset"]);
            let verticalDistance = (enemyPos.y + headOffset) - playerPos.y;
            let horizontalDistance = Math.hypot(direction.x, direction.z);
            let rotationX = Math.atan2(verticalDistance, horizontalDistance);
    
            rotationX = Math.max(Math.min(rotationX, Math.PI / 2), -Math.PI / 2);
            let normalizedRotationY = (rotationY + Math.PI) % (2 * Math.PI);
    
            player.rotation.y = normalizedRotationY;
            player.rotation.x = rotationX;
        }
    }
    
    onRender () {
        if (!hooks?.gameWorld?.server) return;

        if (this.options["On Aim"] == "true" && hooks.gameWorld.player.inputs.rightMB) {
            this.aimAtEnemy();
        } else if (this.options["On Shoot"] == "true" && hooks.gameWorld.player.inputs.leftMB) {
            this.aimAtEnemy();
        } else if (this.options["On Shoot"] !== "true" && this.options["On Aim"] !== "true") {
            this.aimAtEnemy();
        }
    }
}