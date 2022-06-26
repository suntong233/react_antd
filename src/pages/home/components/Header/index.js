import { useState, useEffect } from "react";
import moment from "moment";
// 导入中文语言包
import "moment/locale/zh-cn";

import styles from "./index.module.scss";
// 设置中文
moment.locale("zh-cn");
const Header = () => {
	const [time, setTime] = useState(
		moment().format("YYYY-MM-DD HH:mm:ss dddd")
	);
	useEffect(() => {
		const getTime = () =>
			setTime(moment().format("YYYY-MM-DD HH:mm:ss dddd"));
		const timer = setInterval(getTime, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className={styles.main}>
			<div className={styles.left}>
				欢迎管理员：<span>admin</span>
			</div>
			<div className={styles.right}>{time}</div>
		</div>
	);
};
export default Header;
