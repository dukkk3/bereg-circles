import Matter from "matter-js";
import { HTMLShape } from "../shapes";
import { Renderer } from "../abstractions";
import { ISpaceOptions } from "../types";
import { Utilities } from "../../math";

export class HTMLRenderer extends Renderer {
	protected options: ISpaceOptions["renderer"];

	constructor(options: ISpaceOptions["renderer"]) {
		super();

		this.options = options;
	}

	protected findShapeScale(shape: HTMLShape) {
		return Matter.Vector.create(
			Utilities.findScale(shape.size.width, shape.currentSize.width),
			Utilities.findScale(shape.size.height, shape.currentSize.height)
		);
	}

	protected findShapePosition(shape: HTMLShape) {
		const size = this.options.resizeType === "scale" ? shape.size : shape.currentSize;
		const vectorSize = Matter.Vector.create(size.width / 2, size.height / 2);

		return Matter.Vector.sub(shape.body.position, vectorSize);
	}

	render(shapes: HTMLShape[]) {
		for (const shape of shapes) {
			const position = this.findShapePosition(shape);
			const scale =
				this.options.resizeType === "scale"
					? this.findShapeScale(shape)
					: Matter.Vector.create(1, 1);
			const size = this.options.resizeType === "rect" ? shape.currentSize : shape.size;

			shape.element.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${
				shape.body.angle * this.options.angleFactor
			}rad) scale(${scale.x}, ${scale.y})`;
			shape.element.style.width = `${size.width}px`;
			shape.element.style.height = `${size.height}px`;

			shape.update();
		}
	}
}
