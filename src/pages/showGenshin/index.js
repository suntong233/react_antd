import { SendOutlined, StarFilled } from "@ant-design/icons";
import styles from "./index.module.scss";

const Main = () => {
    let tmpData = {
        nickName: "无名",
        serveName: "天空岛",
        level: 59,
        overviewList: [
            {title:"活跃天数" ,key:"activeDays", v:655},
            {title:"成就达成数" ,key:"achievementCount", v:417},
            {title:"获得角色数" ,key:"characterCount", v:43},
            {title:"解锁传送点" ,key:"waypoint", v:188},
            {title:"风神瞳" ,key:"windPupil", v:66},
            {title:"岩神瞳" ,key:"rockPupil", v:131},
            {title:"雷神瞳" ,key:"thunderPupil", v:165},
            {title:"解锁秘境" ,key:"secretPlace", v:35},
            {title:"深境螺旋" ,key:"abyss", v:"12-3"},
            {title:"华丽宝箱数" ,key:"gorgeousChest", v:100},
            {title:"珍贵宝箱数" ,key:"preciousChest", v:268},
            {title:"精致宝箱数" ,key:"delicateChest", v:1008},
            {title:"普通宝箱数" ,key:"normalChest", v:1288},
            {title:"奇馈宝箱数" ,key:"miracleChest", v:39}
        ],
        characters: [
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            {
                id: 10000046,
				name: "胡桃",
				actived_constellation_num: 1, // 命座
				image: "https://upload-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_Hutao@2x.png",
				icon: "https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Hutao.png",
				element: "Pyro",
				fetter: 10,  // 羁绊
				level: 90,
                rarity: 5,   // 星级
            },
            
        ]
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={`${styles.title} h3`}>展示</div>
            </div>
            <div className={styles.content}>
                <div> {tmpData.nickName + `(${tmpData.serveName} ${tmpData.level}级)`} </div>
                <div> 
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;数据总览
                    </div>
                    <div id="puppeteerScreenShortOverviewList" className={styles.overviewList}>
                        {
                            tmpData.overviewList.map((item, i) => {
                                return (<div key={item.key || i} className={styles.overviewListItem}>
                                    <div className={styles.bigFont}>{item.v}</div> 
                                    <div className={styles.smallFont}>{item.title}</div> 
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.boxtitle}>
                        <SendOutlined twoToneColor="#eb2f96"/>
                        &nbsp;&nbsp;我的角色
                    </div>
                    <div id="puppeteerScreenShortCharacters" className={styles.characters}>
                        {
                            tmpData.characters.map((item, i) => {
                                return (<div key={item.key || i} className={styles.charactersItem}>
                                        <div className={styles.charactersItemCard}>
                                            <div className={styles.charactersItemStar}>
                                                {
                                                    new Array(item.rarity).fill(item.rarity).map((v,i) => {
                                                        return <StarFilled className={styles.charactersItemStarDetail} key={i} style={{color: "#ecd825"}} />
                                                    })
                                                }
                                            </div>

                                            <div className={item.actived_constellation_num===0? styles.hide : styles.charactersItemConstellation}>
                                                {item.actived_constellation_num}                                                
                                            </div>
                                            <img alt="" className={styles.charactersItemIcon} src={item.icon}></img>
                                            <div className={styles.charactersCardLv}>lv{item.level}</div>
                                        </div>
                                </div>)
                            })
                        }
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default Main;
