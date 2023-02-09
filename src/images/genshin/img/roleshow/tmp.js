

let fs = require("fs");
let constants = fs.constants;
let dir = "D:/vsCodeWork/scott/pro/miao-plugin/resources/meta/character"
let names = fs.readdirSync("D:/vsCodeWork/scott/pro/miao-plugin/resources/meta/character")


for (let index = 0; index < names.length; index++) {
    let name = names[index];
    let imgPath = dir + `/${name}/imgs/splash.webp`;
    try {
        fs.accessSync(imgPath, constants.R_OK | constants.W_OK);
        fs.copyFileSync(imgPath, `./${name}.webp`)
    } catch (err) {
        console.error('no access!' + name);
    }
}