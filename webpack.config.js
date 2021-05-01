const path = require("path");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		main: "./index.ts",
	},
	output: {
		filename: "bereg-circles.js",
		path: path.resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
};
