import Matter from "matter-js";

export class Geometry {
	static findDistance(vector1: Matter.Vector, vector2: Matter.Vector) {
		return Math.hypot(vector2.x - vector1.x, vector2.y - vector1.y);
	}
}
