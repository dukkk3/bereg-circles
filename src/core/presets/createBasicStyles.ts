import { CSSBuilder } from "../../common";
import { getDataAttributeName, shapeStateNameKind } from "../config";
import type { ISpaceOptions } from "../types";

export function createBasicStyles(props: {
	categories: ISpaceOptions["categories"];
	selector: ISpaceOptions["common"]["selector"];
}) {
	const css = new CSSBuilder();

	css
		.addSelector(
			`.${props.selector.className.container}`,
			`
            overflow: hidden;
         `
		)
		.addSelector(
			`.${props.selector.className.container} .${props.selector.className.space}`,
			`
            width: 100%;
            height: 100%;
            overflow: hidden;
            -webkit-tap-highlight-color: transparent;
         `
		)
		.addSelector(
			`.${props.selector.className.container} .${props.selector.className.space} .${props.selector.className.shape}`,
			`
				width: 0;
				height: 0;
            position: absolute;
            left: 0;
            top: 0;
				outline: none;
				transform-origin: center;
            will-change: transform, width, height;
         `
		)
		.addSelector(
			`.${props.selector.className.container} .${props.selector.className.space} .${props.selector.className.shape} .${props.selector.className.shapeIcon}`,
			`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            opacity: 0;
            cursor: pointer;
            background: #b1b1b1;
            border-radius: 50%;
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            cursor: pointer;
            will-change: transform;
      `
		);

	props.categories.forEach((category) => {
		shapeStateNameKind.forEach((stateName) => {
			const background = category.stateURL[stateName];

			if (background) {
				css.addSelector(
					`.${props.selector.className.container} .${props.selector.className.space} .${
						props.selector.className.shape
					}[${getDataAttributeName("category")}="${category.key}"] .${
						props.selector.className.shapeIcon
					}.${props.selector.className.state[stateName]}`,
					`
                     background: url("${background}") center center / cover;
                  `
				);
			}
		});
	});

	shapeStateNameKind.forEach((stateName) => {
		css.addSelector(
			`.${props.selector.className.container} .${props.selector.className.space} .${props.selector.className.shape}.${props.selector.className.state[stateName]} .${props.selector.className.shapeIcon}.${props.selector.className.state[stateName]}`,
			`
               opacity: 1;
            `
		);
	});

	return css;
}
