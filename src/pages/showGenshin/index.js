import { SendOutlined, StarFilled } from "@ant-design/icons";
import { Image } from "antd";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import {ReactComponent as StarSvg} from "../../images/genshin/star.svg";

let resinIcon = require("../../images/genshin/dailynote/resinIcon.png");
let coinIcon = require("../../images/genshin/dailynote/coinIcon.png");
let taskIcon = require("../../images/genshin/dailynote/taskIcon.png");
let coinIcon3 = require("../../images/genshin/dailynote/coinIcon3.png");
let transformerIcon = require("../../images/genshin/dailynote/transformerIcon.png");
let sixstar = require("../../images/genshin/六角星.png");


function formatTime(time) {
    let tili_time = (time-0)/60
    let tili_time_str = Math.floor(tili_time/60)+"小时"+ Math.round(tili_time%60) +"分钟"
    return tili_time_str
}

function statsEnums(key) {
    let tmp = {
        "cn_gf01" : "天空岛",
        "active_day_number": "活跃天数",
		"achievement_number": "成就达成数",
		"anemoculus_number": "风神瞳",
		"geoculus_number": "岩神瞳",
		"avatar_number": "获得角色数",
		"way_point_number": "解锁传送点",
		"domain_number": "解锁秘境",
		"spiral_abyss": "深境螺旋",
		"precious_chest_number": "珍贵宝箱数",
		"luxurious_chest_number": "华丽宝箱数",
		"exquisite_chest_number": "精致宝箱数",
		"common_chest_number": "普通宝箱数",
		"electroculus_number": "雷神瞳",
		"magic_chest_number": "奇馈宝箱数"
    };
    return tmp[key] || key
}

const Main = () => {
    const [characters, setCharacters] = useState(
        new Array(46).fill({
            id: 10000046,
            name: "胡桃",
            actived_constellation_num: 1, // 命座
            image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
            card_image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
            element: "Pyro",
            fetter: 10,  // 羁绊
            level: 90,
            rarity: 5,   // 星级
        })
    );
    const [stats, setStats] = useState([]);
    const [role, setRole] = useState({});
    const [dailyNote, setDailyNote] = useState();
    const [abyss, setAbyss] = useState({
        "schedule_id": 50, 
        "total_star": 36, //  得星
        "is_unlock": true, // 解锁
        "start_time": "1657915200", //  开始时间
        "end_time": "1659297599", //  结束时间
        "total_battle_times": 47, //  战斗次数
        "total_win_times": 31, //  获胜次数
        "max_floor": "12-3", //  最深抵达
        "reveal_rank": [
            {
                "avatar_id": 10000052,
                "avatar_icon": "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Shougun.png",
                "value": 31,
                "rarity": 5
            },
            {
                "avatar_id": 10000025,
                "avatar_icon": "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Xingqiu.png",
                "value": 31,
                "rarity": 4
            },
            {
                "avatar_id": 10000046,
                "avatar_icon": "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
                "value": 31,
                "rarity": 5
            },
            {
                "avatar_id": 10000032,
                "avatar_icon": "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Bennett.png",
                "value": 31,
                "rarity": 4
            }
        ]
    });
    

    

    let {search} = useLocation();
    let tmpData = { // 写静态页面临时数据
        nickName: "无名",
        serveName: "天空岛",
        level: 59,
        dailynotes: {
            dailyMsg: new Array(5).fill({ icon: resinIcon, title: "原粹树脂", msg: "将于1小时后全部恢复", status: "77/160" }),
            dispatch: {
                limit: "5/5",
                info: new Array(5).fill({  icon:require("../../images/genshin/img/side/胡桃.png"), msg: "剩余探索时间 1小时22分钟" })
            }
        }   
    }

    useEffect(() => {
        // 获取路由携带数据
        if(search && search.length>0) {
            let query = {};
            search.slice(1).split("&").forEach(v => {
                let [key, value] = v.split("=");
                query[key] = value
            })
            let {eid, qid} = query
            if(eid && qid) {
                axios.get("http://localhost:5500/login"+search).then(res => {
                    if(res.data && res.data.uid) {
                        if (/characters|overviewList|abyssInfo/ig.test(eid)) {
                            const featchData = async () => {
                                let res = await axios.get("http://localhost:5500/normaldata" + search);
                                if (res.data.success) {
                                    let { avatars, stats, role} = res.data.data  // todo 世界探索 壶
                                    setRole(role)
                                    setStats(Object.entries(stats))
                                    setCharacters(avatars)
                                    if (/abyssInfo/ig.test(eid)) {
                                        setAbyss(v => {return {...v}}) // todo
                                        console.log();
                                    }
                                }
                            }
                            featchData()
                        } else if (/dailynotes/ig.test(eid)) {
                            axios.get("http://localhost:5500/dailynotes" + search).then(res => {
                                if (res.data.success) {
                                    let data = res.data.data
                                    let dailyMsg = [];
                                    dailyMsg.push({title:"原粹树脂", icon:resinIcon, msg: `将于${formatTime((data.max_resin-data.current_resin)*480)}后全部恢复`, status:`${data.current_resin}/${data.max_resin}`})
                                    dailyMsg.push({title:"洞天宝钱", icon:coinIcon, msg: `预计${formatTime(data.home_coin_recovery_time)}后达到存储上限`, status:`${data.current_home_coin}/${data.max_home_coin}`})
                                    dailyMsg.push({title:"每日委托任务", icon:taskIcon, msg: `[每日委托]奖励${data.is_extra_task_reward_received? "已":"未"}领取`, status:`${data.finished_task_num}/${data.total_task_num}`})
                                    dailyMsg.push({title:"值得铭记的强敌", icon:coinIcon3, msg: `本周剩余消耗减半次数${data.remain_resin_discount_num}`, status:`${data.remain_resin_discount_num}/${data.resin_discount_num_limit}`})
                                    if (data?.transformer?.recovery_time) {
                                        let {Day, Hour, Minute} = data.transformer.recovery_time
                                        dailyMsg.push({ title: "参数质变仪", icon: transformerIcon, 
                                            msg: `${Day}天${Hour}小时${Minute}分后可再次使用`, 
                                            status: `${data.transformer.recovery_time.reached? "已准备" : "冷却中"}` 
                                        })
                                    }
                                    setDailyNote({...data, dailyMsg});
                                }
                            })
                        }
                    }
                })
                // if(GenShinInfo.uid) {
                //     console.log(GenShinInfo.uid);
                // }
            }
        }
        
    }, [search]) 
    
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={`${styles.title} h3`}>展示</div>
            </div>
            <div className={styles.content}>
                <div id="puppeteerScreenShortOverviewList" className={styles.puppeteerScreenShortOverviewList}>
                    <div> {role.nickname + `(${statsEnums(role.region)} ${role.level}级)`} </div>
                    <div> 
                        <div className={styles.boxtitle}>
                            <SendOutlined twoToneColor="#eb2f96"/>
                            &nbsp;&nbsp;数据总览
                        </div>
                        <div className={styles.overviewList}>
                            {
                                stats.map((item, i) => {
                                    return (<div key={item[0] || i} className={styles.overviewListItem}>
                                        <div className={styles.bigFont}>{item[1]}</div> 
                                        <div className={styles.smallFont}>{statsEnums(item[0])}</div> 
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;我的角色
                    </div>
                    <div id="puppeteerScreenShortCharacters" className={styles.characters}>
                        {
                            characters.map((item, i) => {
                                return (<div key={item.key || i} className={styles.charactersItem}>
                                    <div style={{"backgroundColor": item.rarity===5? "#B9814E" : "#775D9E"}} className={styles.charactersItemCard}>
                                        <div className={styles.charactersItemStar}>
                                            {
                                                new Array(item.rarity===5? 5 : 4).fill(item.rarity).map((v,i) => {
                                                    return <StarFilled className={styles.charactersItemStarDetail} key={i} style={{color: "#ecd825"}} />
                                                })
                                            }
                                        </div>
                                        <div className={item.actived_constellation_num===0? styles.hide : styles.charactersItemConstellation}>
                                            {item.actived_constellation_num}                                                
                                        </div>
                                        <img alt="" className={styles.charactersItemEl} src={require(`../../images/genshin/${item.element.toLowerCase()}_35.png`)}></img>
                                        <img alt="" className={styles.charactersItemIcon} src={item.image}></img>
                                        <div className={styles.charactersCardLv}>lv{item.level}</div>
                                    </div>
                                    <div className={styles.charactersItemCardName}>{item.name}</div>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;实时便签
                    </div>
                    {
                        dailyNote? 
                            <div id="puppeteerScreenShortDailynotes" className={styles.dailynotes}>
                                {
                                    (dailyNote.dailyMsg||tmpData.dailynotes.dailyMsg).map(((item, i) => {
                                        return <div key={i} className={styles.dailynotesCard}>
                                            <Image src={item.icon} className={styles.dailynotesIcon}/>
                                            <div className={styles.dailynotesContent}>
                                                <div className={styles.dailynotesContentTitle}>{item.title}</div>
                                                <div className={styles.dailynotesContentMsg}>{item.msg}</div>
                                            </div>
                                            <div className={styles.dailynotesStatus}>{item.status}</div>
                                        </div>
                                    }))
                                }
                                <div className={styles.dispatchContainer}>
                                    <div>
                                        探索派遣限制&nbsp; {" (" + dailyNote.current_expedition_num+"/"+dailyNote.max_expedition_num+")"}
                                    </div>
                                    {
                                        dailyNote.expeditions.map((item,i) => {
                                            return <div key={i} className={styles.dispatchBox}>
                                                <div className={styles.dispatchBoximage}>
                                                    <Image src={item.avatar_side_icon} className={styles.dispatchBoximageicon}/>
                                                </div>
                                                <div className={styles.dispatchBoxMsg}>
                                                    剩余探索时间 {formatTime(item.remained_time)}
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        : null
                    }
                </div>
                <div>
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;深境螺旋
                    </div>
                    <div id="puppeteerScreenShortAbyss" className={styles.abyss}>
                        <div className={styles.abyssStartEndTime}>
                            统计周期：{moment(abyss.start_time*1000).format("YYYY.MM.DD")}-{moment(abyss.end_time*1000).format("YYYY-MM-DD")} 
                        </div>
                        <div className={styles.abyssDataContainer}>
                            <div className={styles.abyssDataTitle}>挑战回顾</div>
                            <div className={styles.abyssDataBaseInfo}>
                                <span><Image width="26px" src={sixstar}></Image>{abyss.total_star}</span>
                                <span>最深抵达:{abyss.max_floor}</span>
                                <span>战斗次数:{abyss.total_battle_times}</span>
                                <span>获胜次数:{abyss.total_win_times}</span>
                            </div>
                            <div className={styles.abyssDataTitle2}>出战次数</div>
                            <div className={styles.abyssDataReveal}>
                                {
                                    abyss.reveal_rank.map((item, i) => {
                                        let character = characters.find(v => v.id === item.avatar_id)
                                        return (character? <div key={item.avatar_id || i} className={styles.abyssDataRevealContainer}>
                                            {
                                                i!==0? <StarSvg className={styles.abyssDataStar}/> : null
                                            }
                                            <div style={{"backgroundColor": character.rarity===5? "#B9814E" : "#775D9E"}} className={styles.abyssDataRevealBox}>
                                                <div className={styles.charactersItemStar}>
                                                    {
                                                        new Array(character.rarity===5? 5 : 4).fill(character.rarity).map((v,i) => {
                                                            return <StarFilled className={styles.charactersItemStarDetail} key={i} style={{color: "#ecd825"}} />
                                                        })
                                                    }
                                                </div>
                                                <div className={character.actived_constellation_num===0? styles.hide : styles.charactersItemConstellation}>
                                                    {character.actived_constellation_num}                                                
                                                </div>
                                                <img alt="" className={styles.charactersItemEl} src={require(`../../images/genshin/${character.element.toLowerCase()}_35.png`)}></img>
                                                <img alt="" className={styles.charactersItemIcon} src={character.image}></img>
                                                <div className={styles.charactersCardLv}>{item.value}次</div>
                                            </div>
                                        </div> : null)
                                    })
                                }
                            </div>
                            <div className={styles.abyssDataTitle2}>战斗数据榜</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
