import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import { mainRouters, loginRouters } from "./route";

import styles from "./App.module.scss";

const App = () => {
	const { state: sessionState } = useSelector(s => s.session);
	const mainElement = useRoutes(mainRouters);
	const loginElement = useRoutes(loginRouters);

	console.log("sessionState", sessionState);

	const content = useMemo(() => {
		switch (sessionState) {
			case "valid": {
				return mainElement;
			}
			case "invalid": {
				return loginElement;
			}
			default: {
				return <Spin spinning />;
			}
		}
	}, [sessionState, mainElement, loginElement]);

	return <div className={styles.main}>{content}</div>;
};

export default App;
