import React, { Suspense, lazy } from "react";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

import { ReactComponent as HomeSvg } from "@/images/menu/home.svg";
import { ReactComponent as TableSvg } from "@/images/menu/table.svg";

export const routes = [
	{
		path: "index",
		element: lazy(() => import("../home")),
		icon: <HomeSvg />,
		title: "首页",
	},
	{
		path: "table",
		element: lazy(() => import("../table")),
		icon: <TableSvg />,
		title: "表格",
	},
	{
		path: "*",
		element: <Navigate to="index" />,
	},
];

// 路由处理方式
const changeRouter = (routers, path) => {
	return routers.map(item => {
		if (item.children) {
			item.children = changeRouter(item.children);
		}
		if (item.path !== "*" && item.element)
			item.element = (
				<Suspense fallback={<Spin spinning={true}></Spin>}>
					<item.element />
				</Suspense>
			);
		return item;
	});
};

export const routers = changeRouter(routes);
