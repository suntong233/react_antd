import { rest } from "msw";

const data = [
	{
		id: 1,
		name: "小明",
		age: 10,
		score: 99,
	},
	{
		id: 2,
		name: "小红",
		age: 9,
		score: 99,
	},
	{
		id: 3,
		name: "小刚",
		age: 11,
		score: 90,
	},
];

const handlers = [
	rest.get("/app/table", (req, res, ctx) =>
		res(
			ctx.json({
				code: 0,
				data: data,
				msg: "成功",
			})
		)
	),
];

export default handlers;
