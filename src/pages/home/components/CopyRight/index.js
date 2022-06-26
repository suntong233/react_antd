import moment from "moment";
import styles from "./index.module.scss";
const CopyRight = () => {
	const time = moment().format("yyyy");
	return (
		<div className={styles.main}>
			Copyright©2020-{time} | 孙通 | All Rights Reserved.
			<a
				href="https://github.com/suntong233/react_antd"
				style={{ marginLeft: "4px" }}
			>
				沪ICP备2021002475号-1
			</a>
		</div>
	);
};
export default CopyRight;
