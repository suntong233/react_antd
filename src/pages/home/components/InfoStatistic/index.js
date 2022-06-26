import { Table } from "antd";
import styles from "./index.module.scss";

const columns = [
	{
		title: "统计",
		key: "label",
		dataIndex: "label",
	},
	{
		title: "出动次数",
		key: "count",
		dataIndex: "count",
	},
	{
		title: "清扫道路",
		key: "road",
		dataIndex: "road",
	},
	{
		title: "环卫事件",
		key: "event",
		dataIndex: "event",
	},
	{
		title: "清扫里程",
		key: "miles",
		dataIndex: "miles",
	},
	{
		title: "作业时间",
		key: "time",
		dataIndex: "time",
	},
];

const data = [
	{
		label: "总数",
		count: 5,
		road: 2,
		event: 54,
		miles: 12,
		time: 55,
	},
	{
		label: "今日",
		count: 5,
		road: 2,
		event: 54,
		miles: 12,
		time: 55,
	},
	{
		label: "昨日",
		count: 5,
		road: 2,
		event: 54,
		miles: 12,
		time: 55,
	},
	{
		label: "本周",
		count: 5,
		road: 2,
		event: 54,
		miles: 12,
		time: 55,
	},
	{
		label: "本月",
		count: 5,
		road: 2,
		event: 54,
		miles: 12,
		time: 55,
	},
];

const InfoStatistic = () => {
	return (
		<div className={styles.main}>
			<div className={styles.header}>信息统计</div>
			<Table
				columns={columns}
				dataSource={data}
				rowKey="label"
				pagination={false}
			/>
		</div>
	);
};
export default InfoStatistic;
