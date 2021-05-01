import Matter from "matter-js";
import { Geometry } from "../../math";
import { Attractor, Shape } from "../abstractions";

export class AppleLikeAttractor extends Attractor {
	centerPosition: Matter.Vector;

	constructor(centerPosition?: Matter.Vector) {
		super();

		this.centerPosition = centerPosition || Matter.Vector.create();
	}

	attract(shapes: Shape[]) {
		for (const shape of shapes) {
			let centerDistance = Matter.Vector.create();

			centerDistance = Matter.Vector.add(centerDistance, shape.body.position);
			centerDistance = Matter.Vector.sub(centerDistance, this.centerPosition);

			const finalDistance = Matter.Vector.magnitude(centerDistance) || 0.001;

			centerDistance = Matter.Vector.neg(centerDistance);
			centerDistance = Matter.Vector.mult(centerDistance, (1 / finalDistance) * 0.03);

			const distanceFromCenter = Geometry.findDistance(
				this.centerPosition,
				shape.body.position
			);
			const linearDamping = distanceFromCenter > 5 ? 2 : 2 + (5 - distanceFromCenter);
			const force = Matter.Vector.mult(centerDistance, 1 / linearDamping / 10);

			Attractor.applyForce(shape, force);
		}
	}
}
