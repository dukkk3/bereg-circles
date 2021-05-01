import merge from "merge";
import Matter from "matter-js";
import ResizeObserver from "resize-observer-polyfill";
import { Attractor, Renderer, View } from "./abstractions";
import { AppleLikeAttractor } from "./attractors";
import { spaceDefaultOptions, shapeStateNameKind } from "./config";
import { GroundFactory, CircleFactory } from "./factories";
import { HTMLRenderer } from "./renderers";
import { CSSBuilder } from "../common";
import { createBasicStyles } from "./presets";
import { getCursorPosition } from "../utils";
import { HTMLShape } from "./shapes";
import { ScaleView } from "./views";
import type { ISpaceOptions, DeepPartial } from "./types";

export class Space {
	protected engine: Matter.Engine;
	protected runner: Matter.Runner;
	protected world: Matter.World;

	protected renderer: Renderer;
	protected attractor: AppleLikeAttractor;
	protected groundFactory: GroundFactory;
	protected view: View<HTMLShape>;

	protected container: HTMLElement;
	protected space: HTMLElement;

	protected shapes!: HTMLShape[];

	protected basicCSS: CSSBuilder;
	protected mousePosition: Matter.Vector;
	protected isMouseDown: boolean;
	protected isInitialized: boolean;
	protected spaceSize!: {
		width: number;
		height: number;
	};
	protected resizeObserver: ResizeObserver;

	protected options: ISpaceOptions;

	constructor(container: HTMLElement, options: DeepPartial<ISpaceOptions>) {
		this.options = merge.recursive(true, spaceDefaultOptions, options);

		this.engine = Matter.Engine.create(this.options.engine);
		this.runner = Matter.Runner.create({ ...this.options.runner, enabled: true });
		this.world = this.engine.world;
		this.world.gravity.scale = 0;

		this.groundFactory = new GroundFactory();

		this.basicCSS = createBasicStyles({
			categories: this.options.categories,
			selector: this.options.common.selector,
		});
		this.basicCSS.inject();

		this.container = container;
		this.space = this.createSpaceDIV();
		this.container.append(this.space);
		this.container.classList.add(this.options.common.selector.className.container);

		this.renderer = new HTMLRenderer(this.options.renderer);
		this.attractor = new AppleLikeAttractor();
		this.view = new ScaleView({
			layerFactor: this.options.view.layerFactor,
			hideTime: this.options.view.hideTime,
			showTime: this.options.view.showTime,
			size: this.options.common.size,
			onGetSpaceSize: () => this.spaceSize,
		});

		this.resizeObserver = this.createResizeObserver();
		this.resizeObserver.observe(this.space);

		this.updateSpaceSize();
		this.updateGrounds();

		this.mousePosition = Matter.Vector.create();

		this.isMouseDown = this.isInitialized = false;

		this.shapes = [];
	}

	protected createResizeObserver() {
		return new ResizeObserver((entries: any) => {
			const entry = entries[0];

			if (entry) {
				const width = entry.contentRect.width;
				const height = entry.contentRect.height;

				this.attractor.centerPosition = Matter.Vector.create(width / 2, height / 2);
				this.updateSpaceSize(width, height);
				this.updateGrounds();
			}
		});
	}

	protected createSpaceDIV() {
		const spaceDiv = document.createElement("div");

		spaceDiv.classList.add(this.options.common.selector.className.space);

		return spaceDiv;
	}

	protected updateGrounds() {
		if (!this.groundFactory.ground.top) {
			this.groundFactory.create("top");
			// @ts-expect-error
			Matter.World.addBody(this.world, this.groundFactory.ground.top);
		}
		if (!this.groundFactory.ground.bottom) {
			this.groundFactory.create("bottom");
			// @ts-expect-error
			Matter.World.addBody(this.world, this.groundFactory.ground.bottom);
		}

		const top = Matter.Vector.create(this.spaceSize.width / 2, 0);
		const bottom = Matter.Vector.create(this.spaceSize.width / 2, this.spaceSize.height);

		this.groundFactory.updateGroundPosition("top", top);
		this.groundFactory.updateGroundPosition("bottom", bottom);
	}

	protected updateSpaceSize(width: number = 0, height: number = 0) {
		if (width || height) {
			this.spaceSize = {
				width: width,
				height: height,
			};
		} else {
			const DOMRect = this.container.getBoundingClientRect();

			this.spaceSize = {
				width: DOMRect.width,
				height: DOMRect.height,
			};
		}

		this.attractor.centerPosition = Matter.Vector.create(
			this.spaceSize.width / 2,
			this.spaceSize.height / 2
		);
	}

	protected onMouseDown(event: MouseEvent | TouchEvent) {
		if (this.runner.enabled) {
			this.mousePosition = getCursorPosition(event);
			this.isMouseDown = true;
		}
	}

	protected onMouseMove(event: MouseEvent | TouchEvent) {
		if (this.isMouseDown && this.runner.enabled) {
			const position = getCursorPosition(event);
			const difference = Matter.Vector.sub(position, this.mousePosition);
			const distance = Matter.Vector.magnitude(difference);

			this.attractor.centerPosition.x += difference.x * 0.65;

			if (this.attractor.centerPosition.x > this.spaceSize.width) {
				this.attractor.centerPosition.x = this.spaceSize.width;
			} else if (this.attractor.centerPosition.x < 0) {
				this.attractor.centerPosition.x = 0;
			}

			if (distance === 0) {
				return;
			}

			difference.x = difference.x / distance;
			difference.y = difference.y / distance;

			const direction = Matter.Vector.create(difference.x * 0.003, difference.y * 0.002);

			this.shapes.forEach((shape) => {
				Attractor.applyForce(shape, direction);
			});

			this.mousePosition = position;
		}
	}

	protected onMouseUp() {
		this.isMouseDown = false;
	}

	protected completeDestroy() {
		this.basicCSS.destroy();
		this.space.remove();
		this.container.classList.remove(this.options.common.selector.className.container);
	}

	stop() {
		if (this.isInitialized) {
			Matter.Runner.stop(this.runner);
		}
	}

	play() {
		if (this.isInitialized) {
			Matter.Runner.start(this.runner, this.engine);
		}
	}

	destroy(complete: boolean = true) {
		if (this.isInitialized) {
			this.view.hide(this.shapes, () => {
				if (complete) {
					this.completeDestroy();
				}
			});
		}
	}

	bootstrap() {
		if (this.isInitialized) {
			return;
		}

		this.isInitialized = true;

		const factory = new CircleFactory({
			selector: this.options.common.selector,
			size: this.options.common.size,
			categories: this.options.categories,
			mass: this.options.common.mass,
		});

		const shapes = factory.createShapes();

		this.container.addEventListener("mousedown", this.onMouseDown.bind(this));
		this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
		this.container.addEventListener("mouseup", this.onMouseUp.bind(this));
		this.container.addEventListener("touchstart", this.onMouseDown.bind(this));
		this.container.addEventListener("touchmove", this.onMouseMove.bind(this));
		this.container.addEventListener("touchend", this.onMouseUp.bind(this));

		const stateNameSelectors = shapeStateNameKind.map(
			(stateName) => this.options.common.selector.className.state[stateName]
		);

		const shapeElements: HTMLElement[] = [];

		shapes.forEach((shape) => {
			shapeElements.push(shape.element);

			shape.element.addEventListener("click", () => {
				if (!this.runner.enabled) {
					return;
				}

				const oldState = shape.state;

				switch (shape.state) {
					case "initial":
						shape.element.classList.remove(...stateNameSelectors);
						shape.element.classList.add(this.options.common.selector.className.state.active);

						shape.setState("active");
						shape.setMass(this.options.common.mass.active);
						shape.linearResize(
							this.options.common.size.active * 2,
							this.options.common.size.active * 2
						);

						break;
					case "active":
						shape.element.classList.remove(...stateNameSelectors);
						shape.element.classList.add(this.options.common.selector.className.state.primary);

						shape.setState("primary");
						shape.setMass(this.options.common.mass.primary);
						shape.linearResize(
							this.options.common.size.primary * 2,
							this.options.common.size.primary * 2
						);

						break;
				}

				if (shape.state !== oldState && this.options.onSelect) {
					this.options.onSelect({ key: shape.key, state: shape.state });
				}
			});
		});

		this.space.append(...shapeElements);

		this.view.show(shapes, (shape) => {
			Matter.World.addBody(this.world, shape.body);
			this.shapes.push(shape);
		});

		Matter.Events.on(this.runner, "tick", () => {
			this.shapes.forEach((shape) => {
				if (shape.body.position.y < shape.currentSize.height / 2) {
					Matter.Body.setPosition(shape.body, {
						...shape.body.position,
						y: shape.currentSize.height / 2,
					});
				} else if (shape.body.position.y > this.spaceSize.height) {
					Matter.Body.setPosition(shape.body, {
						...shape.body.position,
						y: this.spaceSize.height - shape.currentSize.height / 2,
					});
				}
			});

			this.renderer.render(this.shapes);
		});

		Matter.Events.on(this.engine, "beforeUpdate", () => {
			this.attractor.attract(this.shapes);
		});

		Matter.Runner.run(this.runner, this.engine);
	}
}
