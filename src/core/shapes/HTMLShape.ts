import Matter from "matter-js";
import { Shape } from "../abstractions";

export class HTMLShape extends Shape {
	readonly element: HTMLElement;

	constructor(props: {
		key: string;
		body: Matter.Body;
		element: HTMLElement;
		width: number;
		height: number;
	}) {
		super(props);

		this.element = props.element;
	}
}
