import React from 'react';
import HealthHeader from './health-header';
import {Toast} from 'antd-mobile';
import DataBall from './data-ball';
import Charts from './charts';
import localStorage from '../../util/storage';
import axios from '../../api';
import moment from 'moment';

class Heart extends React.Component {
    constructor(){
        super();
        this.state={
            heartbeat:0
        }
    }
    componentDidMount(){
        this.openId = localStorage.getOpenId();
        this.equipmentId = localStorage.getEquipmentId();
        this.heartBeat();

        let time = moment(new Date()).format("YYYY-MM-DD");
        axios.get(`/api/heart/heartList?openId=${this.openId}&equipmentId=${this.equipmentId}&time=${time}`)
            .then(res=>{
                console.log(res.data)
            })
    }
    measureHeart=()=>{
        axios.get(`/api/heart/measure?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('测量指令发送成功，请稍候')
                    setTimeout(()=>{
                        this.heartBeat();
                    },3000)
                }else{
                    Toast.info(res.data.msg,1)
                }
            })
    };
    heartBeat=()=>{
        axios.get(`/api/heart/heartbeat?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    console.log(res.data)
                    this.setState({
                        heartbeat:res.data.heartbeat
                    })
                }else{
                    Toast.info(res.data.msg,1)
                }
            })
    };
    render() {
        return (
            <div className="heart-beat">
                <HealthHeader now="心率"/>
                <DataBall now="心率" value={this.state.heartbeat} measure={this.measureHeart}/>
                <div className="heart-intro">
                    <h4>温馨提示</h4>
                    <p>对于成年人，60-100次/每分钟的测量值通常被视为正常范围，低于60次/每分钟则偏低，高于100次/每分钟则偏高。</p>
                </div>
                <div>
                    <Charts  type="bar"/>
                </div>
            </div>)
    }
}

export default Heart;