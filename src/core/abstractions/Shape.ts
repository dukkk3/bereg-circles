import Matter from "matter-js";
import { Utilities } from "../../math";
import type { ShapeStateKind } from "../types";

export abstract class Shape {
	readonly key: string;
	readonly state: ShapeStateKind;
	readonly body: Matter.Body;
	readonly currentSize: {
		width: number;
		height: number;
	};

	readonly size: {
		width: number;
		height: number;
	};

	private mass: number;

	protected scale: Matter.Vector;
	protected targetSize: {
		width: number;
		height: number;
	};

	constructor(props: { key: string; body: Matter.Body; width: number; height: number }) {
		this.key = props.key;
		this.body = props.body;

		this.mass = props.body.mass;

		this.state = "initial";
		this.scale = Matter.Vector.create();
		this.currentSize = {
			width: props.width,
			height: props.height,
		};
		this.size = {
			width: props.width,
			height: props.height,
		};
		this.targetSize = {
			width: 0,
			height: 0,
		};
	}

	protected setScale(scale: Matter.Vector) {
		Matter.Body.scale(this.body, scale.x, scale.y);
		Matter.Body.setMass(this.body, this.mass);
		this.scale = scale;
	}

	setMass(mass: number) {
		Matter.Body.setMass(this.body, mass);
		this.mass = mass;
	}

	setState(state: ShapeStateKind) {
		// @ts-expect-error
		this.state = state;
	}

	update() {
		if (
			this.targetSize.width !== this.currentSize.width &&
			this.targetSize.width !== this.currentSize.height &&
			(this.targetSize.width || this.targetSize.height)
		) {
			const width = Utilities.lerp(this.currentSize.width, this.targetSize.width, 0.25);
			const height = Utilities.lerp(this.currentSize.width, this.targetSize.height, 0.25);

			this.resize(width, height);
		} else if (
			this.currentSize.width === this.targetSize.width &&
			this.currentSize.height === this.targetSize.height
		) {
			this.targetSize = {
				width: 0,
				height: 0,
			};
		}
	}

	resize(width: number, height: number) {
		const scale = Matter.Vector.create(
			Utilities.findScale(this.currentSize.width, width),
			Utilities.findScale(this.currentSize.height, height)
		);

		this.currentSize.width = width;
		this.currentSize.height = height;

		this.setScale(scale);
	}

	linearResize(width: number, height: number) {
		this.targetSize = {
			width: width,
			height: height,
		};
	}
}
