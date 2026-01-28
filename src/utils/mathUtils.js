export default {
    normalizeVector(vector) {
        const magnitudeSquared = vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
        if (magnitudeSquared > 0) {
            const reciprocalMagnitude = 1 / Math.sqrt(magnitudeSquared);
            return [vector.x * reciprocalMagnitude, vector.y * reciprocalMagnitude, vector.z * reciprocalMagnitude];
        }
        return vector;
    },

    distanceBetween(point1, point2) {
        const xDifference = point2.x - point1.x;
        const yDifference = point2.y - point1.y;
        const zDifference = point2.z - point1.z;
        return xDifference * xDifference + yDifference * yDifference + zDifference * zDifference;
    },

    distanceBetweenSqrt(pointA, pointB) {
        return Math.sqrt(this.distanceBetween(pointA, pointB));
    },

    calculateDistance(pos1, pos2) {
        return Math.hypot(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
    },

    calculateDistanceArr(pos1, pos2) {
        return Math.hypot(pos2[0] - pos1[0], pos2[1] - pos1[1], pos2[2] - pos1[2]);
    }
};