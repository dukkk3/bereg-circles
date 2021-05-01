import { BeregCircles } from "../src";

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
		categories: [
			{
				key: "c1",
				stateURL: {
					initial: "./static/1.1.svg",
					active: "./static/1.2.svg",
					primary: "./static/1.3.svg",
				},
			},
			{
				key: "c2",
				stateURL: {
					initial: "./static/2.1.svg",
					active: "./static/2.2.svg",
					primary: "./static/2.3.svg",
				},
			},
			{
				key: "c3",
				stateURL: {
					initial: "./static/3.1.svg",
					active: "./static/3.2.svg",
					primary: "./static/3.3.svg",
				},
			},
			{
				key: "c4",
				stateURL: {
					initial: "./static/4.1.svg",
					active: "./static/4.2.svg",
					primary: "./static/4.3.svg",
				},
			},
			{
				key: "c5",
				stateURL: {
					initial: "./static/5.1.svg",
					active: "./static/5.2.svg",
					primary: "./static/5.3.svg",
				},
			},
			{
				key: "c6",
				stateURL: {
					initial: "./static/6.1.svg",
					active: "./static/6.2.svg",
					primary: "./static/6.3.svg",
				},
			},
			{
				key: "c7",
				stateURL: {
					initial: "./static/7.1.svg",
					active: "./static/7.2.svg",
					primary: "./static/7.3.svg",
				},
			},
			{
				key: "c8",
				stateURL: {
					initial: "./static/8.1.svg",
					active: "./static/8.2.svg",
					primary: "./static/8.3.svg",
				},
			},
			{
				key: "c9",
				stateURL: {
					initial: "./static/9.1.svg",
					active: "./static/9.2.svg",
					primary: "./static/9.3.svg",
				},
			},
			{
				key: "c10",
				stateURL: {
					initial: "./static/10.1.svg",
					active: "./static/10.2.svg",
					primary: "./static/10.3.svg",
				},
			},
			{
				key: "c11",
				stateURL: {
					initial: "./static/11.1.svg",
					active: "./static/11.2.svg",
					primary: "./static/11.3.svg",
				},
			},
			{
				key: "c12",
				stateURL: {
					initial: "./static/12.1.svg",
					active: "./static/12.2.svg",
					primary: "./static/12.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
			{
				key: "c13",
				stateURL: {
					initial: "./static/13.1.svg",
					active: "./static/13.2.svg",
					primary: "./static/13.3.svg",
				},
			},
		],
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
