const fs = require("fs");
const path = require("path");

// 搜索文件主方法
function fileSearch(dirPath, res = []) {
	const files = fs.readdirSync(dirPath);
	const promises = files.map((file) => {
		return fs.statSync(path.join(dirPath, file));
	});
	for (let i = 0; i < files.length; i += 1)
		files[i] = path.join(dirPath, files[i]);
	promises.forEach((stat, index) => {
		const isFile = stat.isFile();
		const isDir = stat.isDirectory();
		if (isDir) {
			fileSearch(files[index], res);
		}
		if (isFile) res.push(files[index]);
	});
	return res;
}
module.exports = (dirPath, tarPath) => {
	const paths = fileSearch(dirPath);
	const newpaths = paths
		.map((i) => {
			return i.replace(dirPath, "");
		})
		.filter((i) => i.indexOf("mock") > -1);

	const filecontent = newpaths.map(
		(i, index) => `import handlers${index} from "./${i.replace("\\", "/")}";`
	);

	filecontent.push(
		`const handlers = [${newpaths
			.map((i, index) => `...handlers${index}`)
			.join(", ")}];`
	);

	filecontent.push(`export default handlers;`);
	fs.writeFileSync(tarPath, filecontent.join("\r\n"));
};
