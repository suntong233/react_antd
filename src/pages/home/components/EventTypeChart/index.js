import { useMemo, useRef } from "react";

import useChart from "@/hooks/useChart";

import styles from "./index.module.scss";

const data = [
	{
		id: 2,
		name: "生活垃圾(清飘物)",
		total: 1,
	},
	{
		id: 3,
		name: "少量落叶",
		total: 2,
	},
	{
		id: 4,
		name: "泥土、石子",
		total: 3,
	},
	{
		id: 5,
		name: "牛皮癣",
		total: 4,
	},
	{
		id: 6,
		name: "路面污渍",
		total: 5,
	},
	{
		id: 7,
		name: "道路牌污渍",
		total: 6,
	},
	{
		id: 8,
		name: "果皮箱爆桶",
		total: 7,
	},
	{
		id: 9,
		name: "大量落叶",
		total: 8,
	},
	{
		id: 10,
		name: "交通事故",
		total: 9,
	},
	{
		id: 11,
		name: "历史顽固大量的道路污染",
		total: 10,
	},
	{
		id: 12,
		name: "大量绿化树枝",
		total: 11,
	},
	{
		id: 13,
		name: "大件垃圾",
		total: 12,
	},
	{
		id: 14,
		name: "其他二级类型",
		total: 13,
	},
	{
		id: 15,
		name: "大量建筑垃圾",
		total: 14,
	},
	{
		id: 16,
		name: "新路段接手",
		total: 15,
	},
	{
		id: 17,
		name: "道路提质",
		total: 16,
	},
	{
		id: 18,
		name: "平台调度",
		total: 17,
	},
];

const EventTypeChart = () => {
	const ref = useRef();
	const options = useMemo(() => {
		return {
			tooltip: {
				trigger: "item",
			},
			legend: {
				orient: "vertical",
				left: "right",
			},
			series: [
				{
					type: "pie",
					left: -180,
					radius: ["40%", "70%"],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: "center",
					},
					emphasis: {
						label: {
							show: true,
							fontSize: "18",
							fontWeight: "bold",
						},
					},
					labelLine: {
						show: false,
					},
					data: data
						.filter(i => i.total !== 0)
						.map(i => ({ ...i, value: i.total })),
				},
			],
		};
	}, []);
	useChart(ref, options);
	return (
		<div className={styles.main}>
			<div className={styles.header}>事件类型（今日）</div>
			<div className={styles.content} ref={ref}></div>
		</div>
	);
};
export default EventTypeChart;
