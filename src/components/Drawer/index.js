import React, { useReducer } from "react";
import { Button, Drawer as AntdDrawer } from "antd";

import { ReactComponent as CloseSvg } from "@/images/buttons/close.svg";

import styles from "./index.module.scss";

const Drawer = props => {
	const { drawer, children } = props;
	const { title, visible, width, hide, record } = drawer;
	return (
		<AntdDrawer visible={visible} width={width} closable={false} destroyOnClose>
			<div className={styles.main}>
				<div className={styles.header}>
					<div className={`${styles.title} h3`}>{title}</div>
					<div className={styles.icon}>
						<Button
							type="borderless"
							onClick={hide}
							icon={<CloseSvg />}
						></Button>
					</div>
				</div>
				<div className={styles.content}>
					{React.cloneElement(children, record)}
				</div>
			</div>
		</AntdDrawer>
	);
};

const useDrawer = () => {
	const [store, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "show": {
					const { title, record } = action.value;
					return {
						...state,
						title,
						record: record,
						visible: true,
					};
				}
				case "hide": {
					return {
						...state,
						visible: false,
					};
				}
				default: {
					return state;
				}
			}
		},
		{ visible: false, width: 480 }
	);
	return [
		{
			...store,
			show: p => dispatch({ type: "show", value: p }),
			hide: p => dispatch({ type: "hide", value: p }),
		},
	];
};

Drawer.useDrawer = useDrawer;
export default Drawer;
