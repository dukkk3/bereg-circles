import { getDataAttributeName } from "../core/config";

export class CSSBuilder {
	protected cascades: string[][];

	constructor() {
		this.cascades = [];
	}

	protected createStyleElement() {
		const head = document.head || document.getElementsByTagName("head")[0];
		const style = document.createElement("style");

		style.setAttribute(getDataAttributeName("style"), "");
		style.setAttribute("type", "text/css");

		head.appendChild(style);

		return style;
	}

	protected cascadesToString() {
		return this.cascades.map((cascade) => `${cascade[0]} { ${cascade[1]} }`).join(" ");
	}

	addSelector(selector: string, style: string) {
		this.cascades.push([selector, style]);

		return this;
	}

	destroy() {
		const head = document.head || document.getElementsByTagName("head")[0];
		const styles = head.querySelectorAll(`[${getDataAttributeName("style")}]`);

		styles.forEach((style) => {
			style.remove();
		});

		return this;
	}

	inject() {
		const styles = this.cascadesToString();
		const textNode = document.createTextNode(styles);

		this.createStyleElement().appendChild(textNode);

		return this;
	}
}
