import { rest } from "msw";

const handlers = [
	rest.get("/app/login", (req, res, ctx) =>
		res(
			ctx.json({
				code: 0,
				data: {},
				msg: "成功",
			})
		)
	),
];

export default handlers;
