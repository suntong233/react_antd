const colorGen = require("./src/utils/color-gen.js");
colorGen("./src/style/base.scss", "./src/utils/color.js");
const mockImport = require("./src/utils/mock-import.js");
mockImport("src\\__mock__\\handlers\\", "./src/__mock__/handlers/index.js");
