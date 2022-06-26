const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
	webpack: {
		alias: {
			"@": pathResolve("src"),
		},
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.stats = "errors-warnings";
			paths.appBuild = "build";
			webpackConfig.output = {
				...webpackConfig.output,
				path: path.resolve(__dirname, "build"),
				publicPath: "/",
			};
			return webpackConfig;
		},
	},
	babel: {
		plugins: [
			[
				"import",
				{
					libraryName: "antd",
					libraryDirectory: "es",
					style: true,
				},
			],
		],
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#1890FF",
							"@table-padding-vertical": "8px",
							"@table-padding-horizontal": "20px",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
