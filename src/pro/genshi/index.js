
import axios from "axios";
import crypto from "crypto";
import fs from "fs";
import jsonFormat from "json-format";

let qquid = "1144762566"; // qq号 1144762566 2654073941

// 手机cookie获取方法 Via浏览器 javascript:(()=>{prompt('',document.cookie)})();
class GenshinParse {
    constructor ( props ) {
        this.qqid = props.qqid
        this.clientType = 5
        this.actId = "e202009291139501"
        this.appVersion       = "2.3.0"
        this.referer          = "https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html"
        this.userAgent        = "Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/" + this.appVersion
        this.init() // 初始化
    }

    async init() { // 初始化信息
        this.cookieInfo = getCookies()[this.qqid];
        this.cookie = this.cookieInfo.Cookie
        let userPlayerInfo = await this.getUserPlayer() // 获取cookie对应的玩家信息
        if(userPlayerInfo.data?.list[0]) { // cookie 对应的玩家信息
            let { game_biz, region, game_uid, nickname, level, is_chosen, region_name, is_official  } = userPlayerInfo.data.list[0]
            // game_biz: 'hk4e_cn', region: 'cn_gf01', game_uid: '112491090', nickname: '神仙', 
            // level: 59, is_chosen: true, region_name: '天空岛', is_official: true
            this.region = region;
            this.uid = game_uid-0;
            this.level = level;
            this.nickname = nickname;
            console.log(this.uid);
            
            // let signInfo = await this.getUserPlayerSignInfo(); // 获取签到信息
            // let {total_sign_day,today,is_sign,first_bind,is_sub,month_first,sign_cnt_missed } = signInfo
            // total_sign_day: 21, 连续签到天数  sign_cnt_missed: 1 漏签 is_sign 今日是否签到 today: '2022-07-22', is_sign: true, first_bind: false, s_sub: false, month_first: false, 
            // let signInfo = await this.playerSign() // 签到接口
            // this.uidCharacters = await this.playerCharacters() // 原神uid角色接口
            // if(this.uidCharacters.data && this.uidCharacters.data.avatars) {
            //     let avatars_ids = this.uidCharacters.data.avatars.map(v => v.id)
            //     this.uidCharactersDetail = await this.playerCharactersDetails(avatars_ids) // 角色详情
            // }
            // await this.getPlayerAbyssInfo() // uid深渊
            // await this.getPlayerDailyNotesInfo() // uid便签

            // await this.getPlayerAvatarDetail({avatarId: 10000046}) // 角色详情
            // await this.getPlayerAvatarSkill({avatarId: 10000046}) // 角色技能

            await this.getPlayerledger({month:7})
        }


        
    }



    /** 获取玩家角色信息
     * @param {*} params 
     */
    async getUserPlayer() {
        let ret = await axios.get("https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn", {
            headers: {
                Cookie: this.cookie
            }
        });
        console.log(ret.data);
        if (ret && ret.data && ret.data.message === 'OK' && ret.data.data) {
            return ret.data
        } else {
            return false
        }
    }

    /** 获取玩家签到信息
     * @param {*} params 
     */
    async getUserPlayerSignInfo() {
        let ret = await axios.get(`https://api-takumi.mihoyo.com/event/bbs_sign_reward/info?act_id=${this.actId}&region=${this.region}&uid=${this.uid}`, {
            headers: {
                Cookie: this.cookie
            }
        });
        if (ret && ret.data && ret.data.message === 'OK' && ret.data.data) {
            return ret.data.data
        } else {
            return false
        }
    }
 
     /** 原神uid角色 角色 数据 世界探索 壶 等信息
     * @return Object
     */
    async playerCharacters() {
        let mhyVersion = "2.31.1";
        let res = await axios.get("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/index?server=" + this.region + "&role_id=" + this.uid, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'DS': this.DSGet("role_id=" + this.uid + "&server=" + this.region),
                'Origin': 'https://webstatic.mihoyo.com',
                'x-rpc-app_version': mhyVersion,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 9; Unspecified Device) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/39.0.0.0 Mobile Safari/537.36 miHoYoBBS/'+mhyVersion,  // 2.2.0
                'x-rpc-client_type': this.clientType,
                'Referer': this.referer,
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,en-US;q=0.8',
                'X-Requested-With': 'com.mihoyo.hyperion',
                "Cookie": this.cookie
            }
        });
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidmysData.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid角色接口错误"}
        }
    }

    /** 原神uid角色 详情
     * @return Object
     */
     async playerCharactersDetails(avatars_ids) {
        let mhyVersion = "2.31.1";
        let res = await axios({
            url:"https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/character", 
            method: 'post',
            data: {
                "character_ids": avatars_ids ,"role_id": this.uid ,"server": this.region,
            },
            headers:{
                'DS': this.DSGet('',{"character_ids": avatars_ids ,"role_id": this.uid ,"server": this.region}),
                'Origin': 'https://webstatic.mihoyo.com',
                'Cookie': this.cookie,
                'x-rpc-app_version': mhyVersion,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/' + mhyVersion,
                'x-rpc-client_type': '5',
                'Referer': 'https://webstatic.mihoyo.com/'
            },
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidCharacterDetails.json", jsonFormat(res.data))
            return {success:true, msg:"" , data:res.data}
        } else {
            return {success:false, msg:"uid角色详情列表接口错误"}
        }
    }

     /** 原神uid深渊
     * @return Object
     */
    async getPlayerAbyssInfo() {
        let mhyVersion = "2.31.1";
        let res = await axios.get("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/spiralAbyss?server=" + this.region + "&role_id=" + this.uid + "&schedule_type=1", {
            headers: {
                'DS': this.DSGet("role_id=" + this.uid + "&schedule_type=" + 1 + "&server="+ this.region),
                'Origin': 'https://webstatic.mihoyo.com',
                'Cookie': this.cookie,                
                'x-rpc-app_version': mhyVersion,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/' + mhyVersion, 
                'x-rpc-client_type': this.clientType,
                'Referer': 'https://webstatic.mihoyo.com/'
            }
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidabyss.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid深渊接口错误"}
        }
    }

    /** 原神uid便签
     * @return Object
     */
    async getPlayerDailyNotesInfo() {
        let mhyVersion = "2.31.1";
        let res = await axios.get("https://api-takumi-record.mihoyo.com/game_record/app/genshin/api/dailyNote?server=" + this.region + "&role_id=" + this.uid, {
            headers: {
                'DS': this.DSGet("role_id=" + this.uid + "&server=" + this.region),
                'Origin': 'https://webstatic.mihoyo.com',
                'Cookie': this.cookie,                
                'x-rpc-app_version': mhyVersion,
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/' + mhyVersion,  // 2.11.1
                'x-rpc-client_type': this.clientType,
                'Referer': 'https://webstatic.mihoyo.com/'
            }
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uiddailynotes.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid便签接口错误"}
        }
    }

    /** 单个角色详情
     * @param {{ avatarId:string }} data 
     * @return Object
     */
     async getPlayerAvatarDetail(data) {
        let mhyVersion = "2.31.1";
        let res = await axios.get("https://api-takumi.mihoyo.com/event/e20200928calculate/v1/sync/avatar/detail?region=" + this.region + "&uid=" + this.uid + "&avatar_id=" + data.avatarId, {
            headers: {
                'Cookie': this.cookie               
            }
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidcharacterdetail.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid角色详情接口错误"}
        }
    }

    /** 札记
     * @param {{ month:string }} data 
     * @return Object
     */
     async getPlayerledger(data) {
        let mhyVersion = "2.31.1";
        let res = await axios.get("https://hk4e-api.mihoyo.com/event/ys_ledger/monthInfo?month=" + data.month + "&bind_uid=" + this.uid + "&bind_region=" + this.region, {
            headers: {
                'Cookie': this.cookie               
            }
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidzhaji.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid札记接口错误"}
        }
    }

     /** 单个角色技能
     * @param {{ avatarId:string }} data 
     * @return Object
     */
      async getPlayerAvatarSkill(data) {
        let res = await axios.get("https://api-takumi.mihoyo.com/event/e20200928calculate/v1/avatarSkill/list?avatar_id=" + data.avatarId, {
            headers: {
                'Cookie': this.cookie              
            }
        })
        if(res.data && res.data.message==="OK") {
            fs.writeFileSync("./cache/uidskill.json", jsonFormat(res.data.data))
            return {success:true, msg:"" , data:res.data.data}
        } else {
            return {success:false, msg:"uid技能接口错误"}
        }
    }

    /** 签到
     * @param {*} params 
     */
    async playerSign() {
        let signInfo = await this.getUserPlayerSignInfo(); // 获取签到信息
        let {total_sign_day,today,is_sign,first_bind,is_sub,month_first,sign_cnt_missed } = signInfo
        // if (is_sign) {
        //     return {success:false, msg:"今天已经签到过了"}
        // }
        let res = await axios({
            url:"https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign", 
            method: 'post',
            params: {
                "act_id": this.actId ,"uid": this.uid ,"region": this.region
            },
            headers:{
                'User_Agent': this.userAgent,
                "Cookie": this.cookie,
                "x-rpc-device_id":"53AB9A3A48CCE096452F07B7A155BDCBL",
                'Origin': 'https://webstatic.mihoyo.com',
                'X_Requested_With': 'com.mihoyo.hyperion',
                'DS': this.oldDSGet(),
                'x-rpc-client_type': this.clientType-0,
                'Referer': this.referer,
                'x-rpc-app_version': this.appVersion
            },
        })
        if(res.data?.message) {
            // todo 连续签到天数 漏签天数
            return {success:true, msg:res.data.message}
        } else {
            return {success:false, msg:"签到接口错误"}
        }
    }

    /** old DS 算法
     * @returns String
     */
    oldDSGet() {
        let n = "h8w582wxwgqvahcdkpvdhbh2w9casgfl"
        let i = ((new Date().getTime()) / 1000).toFixed(0)
        let r = `k${(Math.random() * 9).toFixed(0)}${(Math.random() * 9).toFixed(0)}q${(Math.random() * 9).toFixed(0)}m`
        let c = this.md5("salt=" + n + "&t=" + i + "&r=" + r)
        return (i + "," + r + "," + c)
    }

    /** DS 算法
     * @param {*Object} query 
     * @param {*String} br 
     * @returns String
     */
    DSGet(query,br) {
        let n = "xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs"
        let i = ((new Date().getTime()) / 1000).toFixed(0)
        let r = (Math.random()*100000 + 100001).toFixed(0)
        let b = ""
        if(br) {
            b = JSON.stringify(br)        
        }
        let q = query
        let c = this.md5("salt=" + n + "&t=" + i + "&r=" + r + "&b=" + b + "&q=" + q)
        let res = i + "," + r + "," + c;
        return res
    }
    /** md5工具
     * @param {String} str 
     * @returns String
     */
    md5(str) {
        return crypto.createHash('MD5').update(str).digest('hex');
    }
}

// /** 详情 */
// detail: {
//     url: `${host}event/e20200928calculate/v1/sync/avatar/detail`,
//     query: `uid=${this.uid}&region=${this.server}&avatar_id=${data.avatar_id}`
//   },
//   /** 札记 */
//   ys_ledger: {
//     url: 'https://hk4e-api.mihoyo.com/event/ys_ledger/monthInfo',
//     query: `month=${data.month}&bind_uid=${this.uid}&bind_region=${this.server}`
//   },
//   /** 养成计算器 */
//   compute: {
//     url: `${host}event/e20200928calculate/v2/compute`,
//     body: data
//   },
//   /** 角色技能 */
//   avatarSkill: {
//     url: `${host}event/e20200928calculate/v1/avatarSkill/list`,
//     query: `avatar_id=${data.avatar_id}`
//   }


// main(qquid)

function main(qqid) {
    let cookies = getCookies();
    if(!cookies[qqid]) { return {success:false, msg:"qq号错误或者该qq号未绑定uid与cookie"}  }    
    
    // 获取玩家角色信息
    let player = new GenshinParse({qqid})




}







/** 获取 cookies json 信息
 * @returns Object
 */
function getCookies() {
    return JSON.parse(fs.readFileSync("./opcookies.json").toString());
}

/** 保存 cookies json 信息
 * @returns 
 */
function saveCookies(data) {
    fs.writeFileSync("./opcookies.json", jsonFormat(data))
}

/** 睡眠 xxx 好眠
 * @param {*Number} time 
 * @returns Promise
 */
async function sleep(time) {
    return new Promise((e) => {
        if(!/^\d+$/.test(time)) {
            time = 1000
        }
        setTimeout(() => {
            e(time)
        }, time);
    })
}