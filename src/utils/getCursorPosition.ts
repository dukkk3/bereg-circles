import Matter from "matter-js";

export function getCursorPosition(event: MouseEvent | TouchEvent) {
	return event instanceof TouchEvent
		? Matter.Vector.create(event.changedTouches[0].pageX, event.changedTouches[0].pageY)
		: Matter.Vector.create(event.x, event.y);
}
