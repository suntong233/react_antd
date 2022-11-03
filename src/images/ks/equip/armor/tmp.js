let fs = require("fs");






let ModelMap = {
    "913": "生锈的垃圾",
    "914": "生锈的刀片",
    "918": "中级救助",
    "925": "旧改装刀" ,
    "926": "改装刀",
    "1058": "开顿城1号",
    "1059": "开顿城2号" ,
    "1060": "开顿城3号",
    "1062": "MK",
    "1063": "MKⅠ",
    "1064": "MKⅡ",
    "1065": "MKⅢ",
    "1066": "MKⅣ",
    "1067": "MKⅤ",
    "1068": "MKⅥ",
    "1069": "刃行者Ⅰ",
    "1070": "刃行者Ⅱ",
    "1071": "刃行者Ⅲ",
    "52293": "名刃"
}

let WNameMap = {
    "52304": "落日"
}




let dirs = fs.readdirSync("./");
dirs.forEach(f => {
    if(/\.png$|\.jpg$/.test(f)){
        let wId = /(\d+)-rebirth/.exec(f)[1];
        let mId = /mod\.(\d+)-/.exec(f)[1];
        // console.log(mId);
        let name = WNameMap[wId]
        let model = ModelMap[mId]
        if(model && name) {
            // console.log(`${name}(${model})`)
            fs.renameSync(`./${f}`, `./${name}(${model}).png`)
        } else {
            // console.log(f);
        }
    }
})




