const fs = require("fs");

module.exports = (path, dst) => {
	const reg = /^([$@][^;]+);(?:[ ]*\/\/([^\r\n]*))?/gm;
	const contents = fs.readFileSync(path, "utf-8");
	let lines = [];
	let result;
	while ((result = reg.exec(contents))) {
		lines.push({
			content: (result[1] || "").trim(),
			comment: (result[2] || "").trim(),
		});
	}
	const keyValues = lines
		.map(i => {
			if (i.content.indexOf("$") === 0) {
				const { content, comment } = i;

				const [key, value] = content.split(":").map(j => {
					if (j.indexOf("$") === 0)
						return j.slice(1, j.length).replace(/-/g, "_");
					else return j;
				});
				return { key, value, comment };
			}
			return null;
		})
		.filter(i => !!i);
	const filecontent = keyValues
		.map(
			i =>
				`export const ${i.key.toUpperCase()} = "${i.value
					.toUpperCase()
					.trim()}"; ${i.comment ? "// " + i.comment : ""} `
		)
		.join("\r\n");
	fs.writeFileSync(dst, filecontent);
};
