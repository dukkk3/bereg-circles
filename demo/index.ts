import { BeregCircles } from "../src";
import * as assets from "./static";

function bootstrap() {
	const start = document.getElementById("play") as HTMLElement;
	const stop = document.getElementById("stop") as HTMLElement;
	const destroy = document.getElementById("destroy") as HTMLElement;

	const container = document.getElementById("playground") as HTMLElement;
	const space = new BeregCircles(container, {
		onSelect: (payload: { key: string; state: any }) => {
			console.log(payload);
		},
		renderer: {
			resizeType: "scale",
		},
		engine: {
			enableSleeping: true,
		},
		runner: {
			// isFixed: true,
			// delta: 1000 / 60,
		},
		categories: Array(13)
			.fill(0)
			.map((_, index) => ({
				key: String(index),
				stateURL: {
					initial: assets[`i${index + 1}_1` as keyof typeof assets],
					active: assets[`i${index + 1}_2` as keyof typeof assets],
					primary: assets[`i${index + 1}_3` as keyof typeof assets],
				},
			})),
	});

	start.addEventListener("click", () => {
		space.play();
	});

	stop.addEventListener("click", () => {
		space.stop();
	});

	destroy.addEventListener("click", () => {
		space.destroy();
	});

	space.bootstrap();
}

window.addEventListener("load", bootstrap);
