import type { IBodyDefinition } from "matter-js";
import type { ISpaceOptions, ShapeStateKind } from "./types";

export const spaceDefaultOptions: ISpaceOptions = {
	categories: [],
	common: {
		mass: {
			initial: 10,
			active: 20,
			primary: 25,
		},
		size: {
			initial: 50,
			active: 60,
			primary: 70,
		},
		selector: {
			className: {
				shape: "shape",
				shapeIcon: "icon",
				container: "container",
				space: "space",
				state: {
					initial: "initial",
					active: "active",
					primary: "primary",
				},
			},
		},
	},
	engine: {},
	runner: {},
	renderer: {
		angleFactor: 0,
		resizeType: "scale",
	},
	view: {
		hideTime: 1000,
		showTime: 1000,
		layerFactor: 4,
	},
};
export const shapeBodyDefaultOptions: IBodyDefinition = {
	frictionStatic: 0,
	frictionAir: 0.005,
	angularVelocity: 0,
	angularSpeed: 0,
	restitution: 0.1,
	friction: 0,
};
export const shapeStateNameKind: ShapeStateKind[] = ["initial", "active", "primary"];
export const packageName = "bereg-circles";

export const getDataAttributeName = (name: string) => `data-bereg-circles-${name}`;
