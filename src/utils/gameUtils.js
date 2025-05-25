import hooks from "../hooks";
import mathUtils from "./mathUtils";

export default {
    getClosestPlayer () {
        let localPlayerPos = hooks.gameWorld.player.position;
        let playersData = hooks.gameWorld.server.players;
        let playersWithDistances = [];

        playersData.forEach(function(player, playerId) {
            let distance = mathUtils.distanceBetween(
                localPlayerPos,
                { x: player._model.position.x, y: player._model.position.y, z: player._model.position.z }
            );
            player.id = playerId;
            playersWithDistances.push({ player, distance });
        });

        playersWithDistances.sort((a, b) => a.distance - b.distance);

        return playersWithDistances.map(item => item.player)[0];
    },

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }
}