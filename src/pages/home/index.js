import { Col, Row } from "antd";

import Header from "./components/Header";
import Statistic from "./components/Statistic";
import InfoStatistic from "./components/InfoStatistic";
import EventTypeChart from "./components/EventTypeChart";
import MonthStatistic from "./components/MonthStatistic";
import HotNews from "./components/HotNews";

import styles from "./index.module.scss";
import CopyRight from "./components/CopyRight";

const Home = () => {
	return (
		<div className={styles.main}>
			<Row gutter={[20, 20]}>
				<Col span={24}>
					<Header />
				</Col>
				<Col span={24}>
					<Statistic />
				</Col>
				<Col xl={12} md={24} sm={24} xs={24}>
					<InfoStatistic />
				</Col>
				<Col xl={12} md={24} sm={24} xs={24}>
					<EventTypeChart />
				</Col>
				<Col xl={12} md={24} sm={24} xs={24}>
					<MonthStatistic />
				</Col>
				<Col xl={12} md={24} sm={24} xs={24}>
					<HotNews />
				</Col>
				<Col span={24}>
					<CopyRight />
				</Col>
			</Row>
		</div>
	);
};
export default Home;
