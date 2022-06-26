import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "moment/locale/zh-cn";
import moment from "moment";

moment.locale("zh-cn");

if (process.env.NODE_ENV === "development") {
	import("./__mock__");
}

ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ConfigProvider>,
	document.getElementById("root")
);
