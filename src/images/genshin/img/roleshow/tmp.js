

let fs = require("fs");
let constants = fs.constants;
let dir = "D:/vsCodeWork/scott/pro/Miao-Yunzai/plugins/miao-plugin/resources/meta/character"
let names = fs.readdirSync(dir)


for (let index = 0; index < names.length; index++) {
    let name = names[index];
    let imgPath = dir + `/${name}/imgs/splash.webp`;
    let cardPath = dir + `/${name}/imgs/card.webp`;
    try {
        fs.accessSync(imgPath, constants.R_OK | constants.W_OK);
        fs.copyFileSync(imgPath, `./img/${name}3.png`)
        fs.copyFileSync(cardPath, `./img/${name}1.png`)
    } catch (err) {
        console.error('no access!' + name);
    }
}