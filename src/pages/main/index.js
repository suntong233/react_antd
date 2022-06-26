import { useMemo, useState } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

import { GRAY_1 } from "@/utils/color";

import { routes, routers } from "./route";

import styles from "./index.module.scss";

const SubMenu = Menu.SubMenu;

const Main = _ => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const element = useRoutes(routers);

	const menus = useMemo(() => {
		return routes.map(i => {
			if (i.path === "*") return false;
			if (i.children) {
				return (
					<SubMenu key={i.path} title={i.title} icon={i.icon}>
						{i.children.map(j => (
							<Menu.Item key={"/" + j.path}>{j.title}</Menu.Item>
						))}
					</SubMenu>
				);
			}
			return (
				<Menu.Item key={"/" + i.path} icon={i.icon}>
					{i.title}
				</Menu.Item>
			);
		});
	}, []);

	const onMenuClick = e => {
		navigate(e.key);
	};
	return (
		<Layout className={styles.main}>
			<Layout.Header className={styles.header}>
				<div className={styles.logo}>后台管理系统</div>
			</Layout.Header>
			<Layout.Content style={{ display: "flex" }}>
				<Layout>
					<Layout.Sider
						collapsible
						collapsed={collapsed}
						onCollapse={_ => setCollapsed(v => !v)}
						style={{ background: GRAY_1 }}
					>
						<Menu
							defaultSelectedKeys={[window.location.pathname]}
							onClick={onMenuClick}
							mode="inline"
						>
							{menus}
						</Menu>
					</Layout.Sider>
					<Layout.Content className={styles.content}>{element}</Layout.Content>
				</Layout>
			</Layout.Content>
		</Layout>
	);
};

export default Main;
