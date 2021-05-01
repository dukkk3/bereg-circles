import { Factory } from "./Factory";
import { getDataAttributeName, shapeStateNameKind } from "../config";
import type { ICategoryOptions, ISpaceOptions } from "../types";

export abstract class HTMLFactory extends Factory {
	protected selector: ISpaceOptions["common"]["selector"];

	constructor(selector: ISpaceOptions["common"]["selector"]) {
		super();

		this.selector = selector;
	}

	protected createDIV(category: ICategoryOptions) {
		const mainDiv = document.createElement("div");

		mainDiv.classList.add(
			this.selector.className.shape,
			this.selector.className.state.initial
		);

		mainDiv.setAttribute(getDataAttributeName("category"), category.key);

		for (const stateName of shapeStateNameKind) {
			const iconDiv = document.createElement("div");

			iconDiv.classList.add(
				this.selector.className.shapeIcon,
				this.selector.className.state[stateName]
			);

			mainDiv.append(iconDiv);
		}

		return mainDiv;
	}
}
