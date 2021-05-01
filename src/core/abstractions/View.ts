import { Shape } from "./Shape";

export abstract class View<T extends Shape> {
	abstract show(shapes: T[], callback?: (shape: T) => void): void;
	abstract hide(shapes: T[], callback?: () => void): void;
}
