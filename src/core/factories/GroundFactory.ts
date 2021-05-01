import Matter from "matter-js";

export class GroundFactory {
	readonly size: number;
	readonly additionalSize: number;
	readonly ground: {
		top: Matter.Body | null;
		bottom: Matter.Body | null;
		left: Matter.Body | null;
		right: Matter.Body | null;
	};

	constructor(size: number = 10000, additionalSize: number = 3) {
		this.size = size;
		this.additionalSize = additionalSize;
		this.ground = {
			top: null,
			bottom: null,
			left: null,
			right: null,
		};
	}

	updateGroundPosition(
		groundName: keyof GroundFactory["ground"],
		position: Matter.Vector
	) {
		if (!this.ground[groundName]) {
			return;
		}

		// @ts-expect-error
		Matter.Body.setPosition(this.ground[groundName], position);
	}

	create(groundName: keyof GroundFactory["ground"]) {
		if (this.ground[groundName]) {
			return;
		}

		let ground: Matter.Body | null = null;

		switch (groundName) {
			case "top":
			case "bottom":
				ground = Matter.Bodies.rectangle(0, 0, this.size, this.additionalSize, {
					isStatic: true,
				});
				break;
			case "left":
			case "right":
				ground = Matter.Bodies.rectangle(0, 0, this.additionalSize, this.size, {
					isStatic: true,
				});

				break;
		}

		this.ground[groundName] = ground;
	}
}
