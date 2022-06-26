import { rest } from "msw";

const handlers = [
	rest.get("/alarm/event/list", (req, res, ctx) =>
		res(
			ctx.json({
				code: 0,
				data: {
					content: [
						{
							address: "",
							content: "任务提醒，任务处理时间还剩:19分钟,请及时处理!",
							create_time: "2022-04-13 09:26:01",
							event_id: 12805,
							id: 5033,
							info: null,
							name: "翟青华（片区班长）",
							sn: "2027",
							status: 1,
							types: 7,
							update_time: "2022-04-12 21:01:11",
						},
						{
							address: "",
							content: "任务提醒，任务处理时间还剩:19分钟,请及时处理!",
							create_time: "2022-04-13 09:44:01",
							event_id: 12812,
							id: 5061,
							info: null,
							name: "肖元自(片区班长)",
							sn: "2061",
							status: 1,
							types: 7,
							update_time: "2022-04-12 21:01:11",
						},
						{
							address: "",
							content: "任务提醒，任务处理时间还剩:8分钟,请及时处理!",
							create_time: "2022-04-13 09:55:01",
							event_id: 12812,
							id: 5071,
							info: null,
							name: "肖元自(片区班长)",
							sn: "2061",
							status: 1,
							types: 7,
							update_time: "2022-04-12 21:01:11",
						},
						{
							address: "",
							content: "任务超时，超时:0分钟 15秒",
							create_time: "2022-04-13 10:04:01",
							event_id: 12812,
							id: 5074,
							info: null,
							name: "肖元自(片区班长)",
							sn: "2061",
							status: 1,
							types: 2,
							update_time: "2022-04-12 21:01:11",
						},
					],
					number: 1,
					size: 10,
					totalElements: 4,
				},
				msg: "成功",
			})
		)
	),
];

export default handlers;
