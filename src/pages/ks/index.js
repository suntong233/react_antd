// import { Image } from "antd";
// import axios from "axios";
// import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.scss";



const Main = () => {
    let {search} = useLocation();

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
                
            </div>
        </div>
    )
}

export default Main;
