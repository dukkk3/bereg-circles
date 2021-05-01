import { Shape } from "./Shape";

export abstract class Renderer {
	constructor() {}

	abstract render(shapes: Shape[]): void;
}
