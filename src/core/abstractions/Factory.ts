import merge from "merge";
import { Shape } from "./Shape";
import { shapeBodyDefaultOptions } from "../config";
import type { ICategoryOptions } from "../types";

export abstract class Factory {
	protected mergeOptions(category: ICategoryOptions) {
		return merge.recursive(true, category.bodyOptions || {}, shapeBodyDefaultOptions);
	}

	abstract createShapes(): void;
}
