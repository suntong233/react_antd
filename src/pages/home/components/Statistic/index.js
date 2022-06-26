import { Col, Row } from "antd";
import styles from "./index.module.scss";

const Statistic = () => {
	return (
		<div className={styles.main}>
			<div className={styles.header}>数据统计</div>
			<Row>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>环卫车辆</div>
						<div className={styles.number}>65</div>
					</div>
				</Col>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>环卫工人</div>
						<div className={styles.number}>45</div>
					</div>
				</Col>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>环卫设施</div>
						<div className={styles.number}>85</div>
					</div>
				</Col>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>作业区域</div>
						<div className={styles.number}>4</div>
					</div>
				</Col>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>作业道路</div>
						<div className={styles.number}>15</div>
					</div>
				</Col>
				<Col md={4} sm={12} xs={12}>
					<div className={styles.item}>
						<div className={styles.label}>环卫事件</div>
						<div className={styles.number}>34</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};
export default Statistic;
