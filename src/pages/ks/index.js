// import { Image } from "antd";
import axios from "axios";
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
        setFightInfo({});
        // 获取路由携带数据
        if(search && search.length>0) {
            let query = {};
            search.slice(1).split("&").forEach(v => {
                let [key, value] = v.split("=");
                query[key] = value
            })
            let {eid} = query
            if(eid === "FightInfo") {
                // let fuben = decodeURI(query.fuben)
                axios.get("http://localhost:5501/fubenFightInfo" + search).then(res => {
                    if(res.data && res.data.success) {
                        console.log(res.data);
                        setFightInfo(res.data.data);
                    }
                })
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
                                        {renderFightCard(item, true)}
                                    </div>
                                })
                            }
                        </div>
                    : null
                }
                <div id="puppeteerScreenShortCharacterInfo" className={styles.characterContainer}>
                    <div className={styles.characterLeftContainer}></div>
                    <div className={styles.characterEquipContainer}>
                        {/* <div className={styles.testimgbox + " " + styles.imgbox}>
                            <img alt="" src={getImgPath("head")} className={styles.img}></img>
                        </div> */}
                        <div className={styles.characterEquipCard1}>
                            <div className={styles.characterEquipIcon + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("武士头盔(杰作)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                                测试文字信息
                            </div>
                        </div>
                        <div className={styles.characterEquipCard1}>
                            <div className={styles.characterEquipIcon + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("黑色链甲(杰作)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                                测试文字信息
                            </div>
                        </div>
                        <div className={styles.characterEquipCard2}>
                            <div className={styles.characterEquipIcon + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("武士盔甲(杰作)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                            测试文字信息
                            </div>
                        </div>
                        <div className={styles.characterEquipCard2}>
                            <div className={styles.characterEquipIcon + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("武士腿铠(杰作)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                            测试文字信息
                            </div>
                        </div>
                        <div className={styles.characterEquipCard1}>
                            <div className={styles.characterEquipIcon + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("武士靴(杰作)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                            测试文字信息
                            </div>
                        </div>
                        <div className={styles.characterEquipCard3}>
                            <div className={styles.characterEquipIcon2 + " " + styles.imgbox}>
                                <img alt="" src={getImgPath("落日(名刃)")}></img>
                            </div>
                            <div className={styles.characterEquipInfo}>
                            落日(名刃)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function calcHp(hpInfo) {
    let scale = (hpInfo.now/hpInfo.max)*100;
    if(scale<0){scale = 0}
    let now = Math.round(hpInfo.now);
    let max = Math.round(hpInfo.max);
    let text = `${now}/${max}`
    return {
        scale,text
    }
}

function renderFightCard(props, camp2) {
    if(!props || !props.uData){return <></>}
    let {def,taunt,playerCamp,name,key,uData,isUser,head} = props // zb isUser
    let {hp,race,equip,shuxin,skill,cd} = uData // skill cd equip
    return <div className={styles.fightInfoCard}>
        <div className={styles.fightInfoCardLeftBox + `${camp2? ` ${styles.bgccamp}` : ` ${styles.bgccamp1}`}`}>
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
    let findP = IMGKeys.find(v => v.split("/").pop().split(".")[0] === name )
    if(!findP && /^(.+)\(.+\)$/.test(name)){
        findP = IMGKeys.find(v => v.split("/").pop().split(".")[0] === RegExp.$1.trim())
    }
    if(IMGKeys.includes(findP)) {
        return IMG(findP)
    } else {
        return IMG("./kenshi.jpg")  // 
    }
}
export default Main;
