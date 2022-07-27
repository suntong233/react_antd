import { SendOutlined, StarFilled } from "@ant-design/icons";
import { Image } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as StarSvg } from "../../images/genshin/star.svg";
import styles from "./index.module.scss";

let resinIcon = require("../../images/genshin/dailynote/resinIcon.png");
let coinIcon = require("../../images/genshin/dailynote/coinIcon.png");
let taskIcon = require("../../images/genshin/dailynote/taskIcon.png");
let coinIcon3 = require("../../images/genshin/dailynote/coinIcon3.png");
let transformerIcon = require("../../images/genshin/dailynote/transformerIcon.png");
let sixstar = require("../../images/genshin/六角星.png");

let profileAttrEnum = {
    hurtV: "伤害值",
    hpBase: "基础生命",
    hpRate: "生命",
    hpFixed: "固定生命",
    atkBase: "基础攻击",
    atkRate: "攻击",
    atkFixed: "固定攻击",
    defBase: "基础防御",
    defRate: "防御",
    defFixed: "固定防御",
    crRate: "暴击率",
    crDmg: "暴击伤害",
    charging: "元素充能",
    reaction: "元素精通",
    phy: "物理",
    pyro: "火",
    hydro: "水",
    cryo: "冰",
    electro: "雷",
    dendro: "草",
    anemo: "风",
    geo: "岩",
    treatment: "治疗加成",
    betreatment: "被治疗加成",
    shield: "护盾强效",
  }

  function addBai(str) {
    if (/rate|crDmg|charging|treatment/ig.test(str) || ["phy","pyro","hydro","cryo","electro","dendro","anemo","geo","shield"].includes(str)) {
        return "%"
    }
    return ""
  }

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
    const [abyss, setAbyss] = useState();
    const [analysisCharacter, setAnalysisCharacter] = useState();
    

    

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
                                        axios.get("http://localhost:5500/abyssInfo" + search).then(res2 => { 
                                            if (res2.data.success) {
                                                let data2 = res2.data.data
                                                setAbyss(JSON.parse(JSON.stringify(data2)))
                                            }
                                        })
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
                        } else if (/analysisCharacter/ig.test(eid) && query.aid) {
                            axios.get("http://localhost:5500/analysisCharacter" + search).then(res => {
                                if(res.data && res.data.success) {
                                    console.log(res.data.data);
                                    setAnalysisCharacter(res.data.data);
                                }
                            })
                        }
                    }
                })
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
                                                    {item.status === "Finished"? "已完成" : `剩余探索时间 ${formatTime(item.remained_time)}`}
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
                    <div id="puppeteerScreenShortAbyssInfo" className={styles.abyss}>
                        {
                            abyss? 
                            <div>
                            <div className={styles.abyssStartEndTime}>
                                统计周期：{moment(abyss.start_time*1000).format("YYYY.MM.DD")}-{moment(abyss.end_time*1000).format("YYYY-MM-DD")} 
                            </div>
                            <div className={styles.abyssDataContainer}>
                                <div className={styles.abyssDataTitle}>挑战回顾</div>
                                <div className={styles.abyssDataBaseInfo}>
                                    <span><Image width="26px" src={sixstar}></Image>{abyss.total_star}</span>
                                    <span>最深抵达：{abyss.max_floor}</span>
                                    <span>战斗次数：{abyss.total_battle_times}</span>
                                    <span>获胜次数：{abyss.total_win_times}</span>
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
                                <div className={styles.abyssDataFightContainer}>
                                    <div className={styles.abyssDataFightbox}>
                                        最多击破数：{abyss.defeat_rank[0].value}
                                        <Image className={styles.avatar_icon} src={abyss.defeat_rank[0].avatar_icon} />
                                    </div>
                                    <div className={styles.abyssDataFightbox}>
                                        最强一击：{abyss.damage_rank[0].value}
                                        <Image className={styles.avatar_icon} src={abyss.damage_rank[0].avatar_icon} />
                                    </div>
                                    <div className={styles.abyssDataFightbox}>
                                        承受伤害：{abyss.take_damage_rank[0].value}
                                        <Image className={styles.avatar_icon} src={abyss.take_damage_rank[0].avatar_icon} />
                                    </div>
                                    <div className={styles.abyssDataFightbox}>
                                        元素战技：{abyss.normal_skill_rank[0].value}
                                        <Image className={styles.avatar_icon} src={abyss.normal_skill_rank[0].avatar_icon} />
                                    </div>
                                    <div className={styles.abyssDataFightbox}>
                                        元素爆发：{abyss.energy_skill_rank[0].value}
                                        <Image className={styles.avatar_icon} src={abyss.energy_skill_rank[0].avatar_icon} />
                                    </div>
                                </div>
                            </div>
                            {
                                abyss.floors.map((item, i) => {
                                    if(i !== (abyss.floors.length-1)) {
                                        return null
                                    }
                                    let timestamp = 0;
                                    item.levels.forEach(itemlevek => {
                                        if(itemlevek.battles[1].timestamp && itemlevek.battles[0].timestamp) {
                                            timestamp += itemlevek.battles[1].timestamp - itemlevek.battles[0].timestamp
                                        }
                                    })
                                    return <div key={item.index || i} className={styles.abyssFloorContainer}>
                                        <div className={styles.abyssFloorContainerInn}>
                                            <div className={styles.abyssFloorContainerHeader}>
                                                <div className={styles.abyssFloorContainerHeaderTitle}>{item.index}</div>
                                                <div className={styles.abyssFloorContainerHeaderTitle2}>
                                                    深境螺旋第{item.index}层
                                                    &nbsp;合计{Math.floor(timestamp/60)}分{timestamp%60}秒
                                                </div>
                                                <div>
                                                    <span>
                                                        <Image width="26px" src={sixstar} />
                                                    </span>
                                                    <span>
                                                        {item.star}/{item.max_star}
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                item.levels.map((level, i2) => {
                                                    return <div key={level.index || i2} className={styles.abyssFloorLevelContainer}>
                                                        <div className={styles.abyssFloorLevelHeader}>
                                                            <div>第{level.index}间</div>
                                                            <div className={styles.abyssFloorLevelHeaderTimeMsg}>
                                                                {moment(level.battles[0].timestamp*1000).format("HH:mm:ss")}-
                                                                {moment(level.battles[1].timestamp*1000).format("HH:mm:ss")}
                                                                &nbsp;共计{Math.floor((level.battles[1].timestamp-level.battles[0].timestamp)/60)}分钟{(level.battles[1].timestamp-level.battles[0].timestamp)%60}秒
                                                            </div>
                                                            <div> <Image width="26px" src={sixstar} /> x {level.star}</div>
                                                        </div>
                                                        {
                                                            level.battles.map(battle => {
                                                                return <div key={battle.index} className={styles.abyssFloorLevelBattleContainer}>
                                                                    {
                                                                        battle.avatars.map(avatar => {
                                                                            let character = characters.find(v => v.id === avatar.id)
                                                                            return (character? <div key={avatar.avatar_id || i} className={styles.abyssDataRevealContainer}>
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
                                                                                    <div className={styles.charactersCardLv}>Lv{character.level}</div>
                                                                                </div>
                                                                            </div> : null)
                                                                        })
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            </div>
                            : null
                        }
                        
                    </div>
                </div>
                <div>
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;角色分析
                    </div>
                    
                    <div id="puppeteerScreenShortAnalysis" style={{backgroundImage: `url("${require('../../images/genshin/img/roleDetail/'+(analysisCharacter?.name||'荧')+'1.png')}")`}} className={styles.characterAnalysisContainer}>
                        {
                            analysisCharacter? 
                            <div style={{backgroundImage: `url("${analysisCharacter.avatarDetail.image}")`}} className={styles.characterAnalysisBox}>
                                <div className={styles.logo}>分析出自q群:1061498138</div>
                                <Image className={styles.charactersItemEl2} src={require(`../../images/genshin/${analysisCharacter.element.toLowerCase()}_35.png`)} />
                                <div className={styles.characterInfoBox}>
                                    <div className={styles.characterInfoName}>
                                        {analysisCharacter.name}
                                    </div>
                                    <div className={styles.characterInfoDiv}>
                                        <div>Lv{analysisCharacter.level}</div>
                                        <div>好感:{analysisCharacter.fetter}</div>
                                        <div>{analysisCharacter.actived_constellation_num}命</div>
                                    </div>
                                    
                                </div>
                                <div className={styles.skillContainer}>
                                    {
                                        analysisCharacter.skill_list.map((skill, i) => {
                                            return <div key={skill.id} className={styles.skillBox}>
                                                <Image className={styles.skillIcon} src={skill.icon} />
                                                {
                                                    skill.level_current > 0 ? 
                                                        <div className={styles.skillLevel}>{skill.level_current}</div>
                                                    : null
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                                <div className={styles.constellationsContainer}>
                                    {
                                        analysisCharacter.avatarDetail.constellations.map((constellation, i) => {
                                            return <div key={constellation.id} className={styles.constellationBox + `${constellation.is_actived?" "+styles.constellationBoxActive:""}`}>
                                                <Image className={styles.constellationIcon} src={constellation.icon} />
                                            </div>
                                        })
                                    }
                                </div>
                                <div className={styles.weaponContainer}>
                                    <div className={styles.weaponContainerImg}>
                                        <Image className={styles.weaponIcon} src={analysisCharacter.avatarDetail.weapon.icon} />
                                    </div>
                                    <div className={styles.weaponContainerInfo}>
                                        <div className={styles.weaponTitle}>
                                            {analysisCharacter.avatarDetail.weapon.name}
                                        </div>
                                        <div className={styles.weaponStar}>
                                            {
                                                new Array(analysisCharacter.avatarDetail.weapon.rarity===5? 5 : 4).fill(analysisCharacter.avatarDetail.weapon.rarity).map((v,i) => {
                                                    return <StarFilled className={styles.charactersItemStarDetail} key={i} style={{color: "#ecd825"}} />
                                                })
                                            }
                                        </div>
                                        <div className={styles.weaponLevel}>
                                            <span>Lv{analysisCharacter.avatarDetail.weapon.level}</span>
                                            <span>精炼{analysisCharacter.avatarDetail.weapon.affix_level}</span>
                                        </div>
                                        <div className={styles.weaponLevel2}>
                                            <span>608</span>
                                            <span>62.2%暴击</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.reliquariesContainer}>
                                        {
                                            Object.values(analysisCharacter.relics.Reliquary).map((relics,i)=>{
                                                return <div key={relics.id||i} className={styles.reliquariesBox}>
                                                    <div className={styles.reliquariesTitle}>
                                                        <div className={styles.reliquariesTitleImage}>
                                                            <Image className={styles.relicsIcon} src={require("../../images/genshin/relics/icon/"+relics.name+".png")} />
                                                            <div className={styles.reliquariesLevel}>
                                                                +{relics.level}
                                                            </div>
                                                        </div>
                                                        <div className={styles.reliquariesTitleInfo}>
                                                            <div className={styles.reliquariesName}>
                                                                {relics.name}
                                                            </div>
                                                            <div className={styles.weaponStar}>
                                                                {
                                                                    new Array(relics.rankLevel===5? 5 : 4).fill(relics.rankLevel).map((v,i) => {
                                                                        return <StarFilled className={styles.charactersItemStarDetail} key={i} style={{color: "#ecd825"}} />
                                                                    })
                                                                }
                                                            </div>
                                                            <div className={styles.nowrap}>
                                                                {profileAttrEnum[relics.main[0]]||relics.main[0]}: {relics.main[1]}{addBai(relics.main[0])}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.reliquariesData}>
                                                        {
                                                            Object.entries(relics.attrs).map((ritem, i) => {
                                                                return <div key={ritem[0]}>
                                                                    <div>{profileAttrEnum[ritem[0]]||ritem[0]}:</div>
                                                                    <div>{ritem[1]}{addBai(ritem[0])}</div>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            })
                                        }
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;
