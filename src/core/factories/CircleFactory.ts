import Matter from "matter-js";
import { HTMLFactory } from "../abstractions";
import { HTMLShape } from "../shapes";
import { ICategoryOptions, ISpaceOptions } from "../types";

export class CircleFactory extends HTMLFactory {
	protected categories: ISpaceOptions["categories"];
	protected size: ISpaceOptions["common"]["size"];
	protected mass: ISpaceOptions["common"]["mass"];

	constructor(props: {
		selector: ISpaceOptions["common"]["selector"];
		categories: ISpaceOptions["categories"];
		mass: ISpaceOptions["common"]["mass"];
		size: ISpaceOptions["common"]["size"];
	}) {
		super(props.selector);

		this.mass = props.mass;
		this.categories = props.categories;

		this.size = props.size;
	}

	protected createShape(category: ICategoryOptions) {
		const div = this.createDIV(category);
		const options = this.mergeOptions(category);
		const body = Matter.Bodies.circle(0, 0, this.size.initial, {
			...options,
			mass: this.mass.initial,
		});

		const shape = new HTMLShape({
			key: category.key,
			body: body,
			element: div,
			width: this.size.initial * 2,
			height: this.size.initial * 2,
		});

		return shape;
	}

	createShapes() {
		return this.categories.map((category) => this.createShape(category));
	}
}
