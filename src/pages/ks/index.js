// import { Image } from "antd";
// import axios from "axios";
// import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";
let IMG = require.context("../../images/ks", true, /\.png$|\.jpg$/);
let IMGKeys = IMG.keys();
const Main = () => {
    const [fightInfo, setFightInfo] = useState({});
    

    let {search} = useLocation();

    useEffect(() => {
        setFightInfo({
            playerData: {
                2654073941: {
                    head:"https://www.baidu.com/img/pc_675fe66eab33abff35a2669768c43d95.png",
                    name: "playerName",
                    key: "playerid",
                    uData: {
                        skill:{skill1:true},
                        "hp": {
                            "头部": {
                                "now": 100,
                                "max": 100
                            },
                            "胸部": {
                                "now": 100,
                                "max": 100
                            },
                            "腹部": {
                                "now": 100,
                                "max": 100
                            },
                            "左手": {
                                "now": 100,
                                "max": 100
                            },
                            "右手": {
                                "now": 100,
                                "max": 100
                            },
                            "左腿": {
                                "now": 100,
                                "max": 100
                            },
                            "右腿": {
                                "now": 100,
                                "max": 100
                            }
                        },
                        "shuxin": {
                            "力量": 205286,
                            "敏捷": 53573,
                            "韧性": 114208,
                            "武士刀": 73,
                            "军刀": 1,
                            "砍刀": 1,
                            "长柄刀": 1,
                            "钝器": 248195,
                            "重武器": 69285,
                            "攻击": 262493,
                            "防御": 182833,
                            "偷窃": 8762,
                            "撬锁": 4881
                        },
                        "equip": {
                            "腰带": "提灯",
                            "头部": "锡罐(杰作)",
                            "盔甲": "圣国铠甲(专家)",
                            "背心": "黑色链甲(杰作)",
                            "腿部": "",
                            "鞋子": "",
                            "武器": "重型十手(MKⅠ)"
                        },
                    },
                    def: false, // 
                    isUser: true,
                    playerCamp: true, // 
                    taunt: false, // 
                    zb: 50, // 
                }
            },
            npcData: {
                npc1: {
                    head:"测试",
                    name: "npcname",
                    key: "npckey",
                    uData: {
                        "name": "利维坦",
                        "ck": 2890459519,
                        "race": "liweitan",
                        "hp": {
                            "头部": 2430.69733170475,
                            "胸部": 2475.92765079325,
                            "腹部": 2305.0367141710003,
                            "左手": 2451.3254144365,
                            "右手": 2402.120941723,
                            "左腿": 2403.445659598,
                            "右腿": 2475.39776364325
                        },
                        "items": {
                            "利维坦宝珠": 1
                        },
                        "equip": {
                            "腰带": "",
                            "头部": "",
                            "盔甲": "",
                            "背心": "",
                            "腿部": "",
                            "鞋子": "",
                            "武器": ""
                        },
                        "shuxin": {
                            "力量": 50,
                            "敏捷": 61,
                            "韧性": 63,
                            "武士刀": 51,
                            "军刀": 55,
                            "砍刀": 62,
                            "长柄刀": 59,
                            "钝器": 62,
                            "重武器": 59,
                            "攻击": 46,
                            "防御": 58
                        }
                    }, // 
                    def: false, // 
                    taunt: false, // 
                    zb: 50, // 
                }
            }
        });
        // 获取路由携带数据
        if(search && search.length>0) {
            let query = {};
            search.slice(1).split("&").forEach(v => {
                let [key, value] = v.split("=");
                query[key] = value
            })
            let {eid, qid} = query
            if(eid && qid) {
                // axios.get("http://localhost:5500/login"+search).then(res => {
                //     if(res.data && res.data.uid) {
                        
                //     }
                // })
            }
        }
    }, [search]) 
    
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={`${styles.title} h3`}>ks</div>
            </div>
            <div className={styles.content}>
                {
                    fightInfo?.playerData ? 
                        <div id="puppeteerScreenShortFightInfo" className={styles.fightInfoContainer}>
                            {
                                Object.values(fightInfo.playerData).map((item,i) => {
                                    return <div key={i}>
                                        {renderFightCard(item)}
                                    </div>
                                })
                            }
                            {
                                Object.values(fightInfo.npcData).map((item,i) => {
                                    return <div key={i}>
                                        {renderFightCard(item)}
                                    </div>
                                })
                            }
                        </div>
                    : null
                }
                
            </div>
        </div>
    )
}

function calcHp(hpInfo) {
    let scale = (hpInfo.now/hpInfo.max)*100;
    let now = Math.round(hpInfo.now);
    let max = Math.round(hpInfo.max);
    let text = `${now}/${max}`
    return {
        scale,text
    }
}

function renderFightCard(props) {
    if(!props || !props.uData){return <></>}
    let {def,taunt,playerCamp,name,key,uData,isUser,head} = props // zb isUser
    let {hp,race,equip,shuxin,skill,cd} = uData // skill cd equip
    return <div className={styles.fightInfoCard}>
        <div className={styles.fightInfoCardLeftBox}>
            <div className={styles.fightInfoCardLeftBoxBaseInfo}>
                <div className={styles.fightInfoCardLeftBoxBaseInfoHeadIcon}>
                    <img alt="head" src={/http/.test(head)? head: getImgPath(head)}></img>
                </div>
                <div className={styles.fightInfoCardLeftBoxBaseInfoHeadFontBox}>
                    <div>{name}</div>
                    <div>{key}</div>
                    <div>{def?"防御 ":""} {taunt?"嘲讽 ":""} {race||"人类"}</div>
                    <div>{playerCamp?"是":"非"}玩家队伍</div>
                </div>
            </div>
            <div className={styles.fightInfoCardLeftBoxEquipBox}>
                {
                    Object.values(equip).filter(v=>v!=="").join("  ")
                }
            </div>
            <div className={styles.fightInfoCardLeftBoxEquipBox}>
                {
                    Object.entries(shuxin).filter(v => /攻击|防御|力量|敏捷|韧性/.test(v[0])).map(v=>{return `${v[0]}:${isUser? xp2lv(v[1]):v[1]}`}).join(" ")
                }
            </div>
            <div className={styles.fightInfoCardLeftBoxEquipBox}>
                {
                    Object.keys(skill||{}).join(" ")
                }
                {
                    Object.keys(cd||{}).join(" ")
                }
            </div>
        </div>
        <div className={styles.fightInfoHpBox}>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["头部"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`头部 ${calcHp(hp["头部"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["胸部"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`胸部 ${calcHp(hp["胸部"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["腹部"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`腹部 ${calcHp(hp["腹部"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["左手"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`左手 ${calcHp(hp["左手"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["右手"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`右手 ${calcHp(hp["右手"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["左腿"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`左腿 ${calcHp(hp["左腿"]).text}`} </div>
            </div>
            <div className={styles.fightInfoHpBoxBuwei}>
                <div style={{"width": `${calcHp(hp["右腿"]).scale}%`}} className={styles.fightInfoHpBoxBuweihp}></div>
                <div className={styles.fightInfoHpBoxBuweihpFont}> {`右腿 ${calcHp(hp["右腿"]).text}`} </div>
            </div>
        </div>
    </div>
}
function xp2lv(xp) {
    // Math.floor(10000**0.4/2.5)
    return Math.floor(xp ** 0.28 / 0.48)
}
function getImgPath(name) {
    let findP = IMGKeys.find(v => new RegExp(`/${name}.(png|jpg)$`).test(v))
    if(IMGKeys.includes(findP)) {
        return IMG(findP)
    } else {
        return IMG("./kenshi.jpg")  // 
    }
}
export default Main;
