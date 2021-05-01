import Matter from "matter-js";
import { Shape } from "./Shape";

export abstract class Attractor {
	static applyForce(shape: Shape, direction: Matter.Vector) {
		Matter.Body.applyForce(shape.body, shape.body.position, direction);
	}

	abstract attract(shapes: Shape[]): void;
}
