export class Utilities {
	static lerp(x: number, y: number, t: number) {
		return x * (1 - t) + y * t;
	}

	static findScale(currentSize: number, newSize: number) {
		const difference = newSize - currentSize;
		const scale = 1 + difference / currentSize;

		return scale;
	}
}
