import { useEffect, useMemo, useState } from "react";
import * as echarts from "echarts";

const useChart = (ref, options) => {
	const [chart, setChart] = useState(null);
	useEffect(() => {
		if (ref.current) {
			const myChart = echarts.init(ref.current);
			setChart(myChart);
		}
	}, [ref]);

	useEffect(() => {
		if (chart) chart.setOption(options);
	}, [chart, options]);

	return useMemo(() => chart, [chart]);
};

export default useChart;
