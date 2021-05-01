import Matter from "matter-js";
import { Shape, View } from "../abstractions";
import { ISpaceOptions } from "../types";

export class ScaleView<T extends Shape> extends View<T> {
	protected layerFactor: number;
	protected onGetSpaceSize: () => { width: number; height: number };
	protected size: ISpaceOptions["common"]["size"];
	protected hideTime: number;
	protected showTime: number;

	constructor(props: {
		layerFactor: number;
		onGetSpaceSize: ScaleView<T>["onGetSpaceSize"];
		hideTime: number;
		showTime: number;
		size: ISpaceOptions["common"]["size"];
	}) {
		super();

		this.layerFactor = props.layerFactor;
		this.onGetSpaceSize = props.onGetSpaceSize;
		this.hideTime = props.hideTime;
		this.showTime = props.showTime;
		this.size = props.size;
	}

	protected createChunks(shapes: T[]) {
		const chunk: T[] = [];
		const chunks: T[][] = [];

		let layer = 0;

		shapes.forEach((shape, index) => {
			chunk.push(shape);

			if (
				layer === 0 ||
				chunk.length === layer * this.layerFactor ||
				index === shapes.length - 1
			) {
				chunks.push([...chunk]);
				chunk.splice(0, chunk.length);
				layer++;
			}
		});

		return chunks;
	}

	show(shapes: T[], callback: (shape: T) => void) {
		shapes.forEach((shape) => {
			shape.resize(1, 1);
		});

		const spaceSize = this.onGetSpaceSize();
		const centerPosition = Matter.Vector.create(spaceSize.width / 2, spaceSize.height / 2);
		const chunks = this.createChunks(shapes);
		const factor = this.showTime / shapes.length;

		let index = 0;

		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];

			for (let j = 0; j < chunk.length; j++) {
				const shape = chunk[j];

				const theta = (Math.PI * 2) / (i * this.layerFactor || 1);
				const term = Matter.Vector.create(
					this.size.initial * 2 * i * Math.sin(theta * j),
					this.size.initial * 2 * i * Math.cos(theta * j)
				);
				const position = Matter.Vector.add(centerPosition, term);

				if (position.y < this.size.initial) {
					position.y = this.size.initial;
				} else if (position.y > spaceSize.height - this.size.initial) {
					position.y = spaceSize.height - this.size.initial;
				}

				Matter.Body.setPosition(shape.body, position);

				setTimeout(() => {
					shape.linearResize(this.size.initial * 2, this.size.initial * 2);
					callback(shape);
				}, factor * index);

				index++;
			}
		}
	}

	hide(shapes: T[], callback?: () => void) {
		const factor = this.hideTime / shapes.length;

		shapes.forEach((shape, index) => {
			setTimeout(() => {
				shape.linearResize(1, 1);
				if (index === shapes.length - 1) {
					if (callback) {
						callback();
					}
				}
			}, index * factor);
		});
	}
}
