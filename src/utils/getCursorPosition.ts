import Matter from "matter-js";
import { UserActionButtonType } from "../core/types";

export function getCursorPosition(
	type: UserActionButtonType,
	event: TouchEvent | MouseEvent
) {
	switch (type) {
		case UserActionButtonType.Mouse:
			// @ts-expect-error
			return Matter.Vector.create(event.x, event.y);
		default:
			return Matter.Vector.create(
				// @ts-expect-error
				event.changedTouches[0].pageX,
				// @ts-expect-error
				event.changedTouches[0].pageY
			);
	}
}
