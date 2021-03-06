import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";

export const routes = [
	{
		path: "/*",
		element: lazy(() => import("./pages/main")),
	},
];

export const loginRoutes = [
	{
		path: "/login",
		element: lazy(() => import("./pages/login")),
	},
	{
		path: "*",
		element: <Navigate to="/login" />,
	},
];

// 路由处理方式
const changeRouter = routers => {
	return routers.map(item => {
		if (item.path !== "*")
			item.element = (
				<Suspense fallback={<Spin spinning={true}></Spin>}>
					<item.element />
				</Suspense>
			);
		return item;
	});
};

// 必须这样子，不然会报什么hook错误的问题
export const mainRouters = changeRouter(routes);
export const loginRouters = changeRouter(loginRoutes);
