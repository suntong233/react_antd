import { Table } from "antd";

import * as Apis from "./action";

import useFetch from "@/hooks/useFetch";

import styles from "./index.module.scss";
import { useEffect } from "react";

const Main = props => {
	const [fetchs, getData, isLoading] = useFetch(Apis);
	const data = getData(d => d.loadData?.data || []);
	const loading = isLoading(l => l.loadData);

	useEffect(() => {
		fetchs.loadData();
	}, [fetchs]);
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<div className={`${styles.title} h3`}>查询表格</div>
			</div>
			<div className={styles.content}>
				<div className={styles.search}></div>
				<div className={styles.table}>
					<Table
						loading={loading}
						rowKey="id"
						dataSource={data}
						columns={[
							{
								title: "姓名",
								key: "name",
								dataIndex: "name",
							},
							{
								title: "年龄",
								key: "age",
								dataIndex: "age",
							},
							{
								title: "成绩",
								key: "score",
								dataIndex: "score",
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};
export default Main;
