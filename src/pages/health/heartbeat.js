import React from 'react';
import HealthHeader from './health-header';
import {Toast} from 'antd-mobile';
import DataBall from './data-ball';
import Charts from './charts';
import localStorage from '../../util/storage';
import axios from '../../api';

class Heart extends React.Component {
    constructor(){
        super();
        this.state={
            heartbeat:0,
            measuring:false,
        }
    }
    componentDidMount(){
        this.openId = localStorage.getOpenId();
        this.equipmentId = localStorage.getEquipmentId();
        this.heartBeat();

        //获取当月心率数据列表
        axios.get(`/api/heart/getListOfCurrMonth?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    let data = res.data.data;
                    data=data.map((item,index)=>{
                        let date = new Date(item.createTime).getDate();
                        return{
                            date:date,
                            itemData:item.heartbeat
                        }
                    });
                    this.setState({
                        heartBeatLists:data
                    })
                }
            })
    }
    //发送测量心率指令
    measureHeart=()=>{
        axios.get(`/api/heart/measure?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{

                if(res.data.success){
                    Toast.info('测量指令发送成功，请稍候40s后获取测量结果',2)
                    this.setState({
                        measuring:true
                    });
                    setTimeout(()=>{
                        this.heartBeat();
                        this.setState({
                            measuring:false
                        })
                    },60000)
                }else{
                    Toast.info(res.data.msg,1)
                }

            })
    };
    //获取测量后心率
    heartBeat=()=>{
        axios.get(`/api/heart/heartbeat?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    console.log(res.data)

                    if(res.data.data!==null){
                        this.setState({
                            heartbeat:res.data.data.heartbeat
                        })
                    }else{
                        this.setState({
                            heartbeat:res.data.data
                        })
                    }

                }else{
                    Toast.info(res.data.msg,1)
                }
            })
    };

    render() {
        return (
            <div className="heart-beat">
                <HealthHeader now="心率"/>
                <DataBall now="心率" measuring={this.state.measuring}
                          value={this.state.heartbeat}
                          measure={this.measureHeart}
                          danger={this.state.heartbeat!==null&&(this.state.heartbeat<60||this.state.heartbeat>100)}
                />
                <div className="heart-intro">
                    <h4>温馨提示</h4>
                    <p>对于成年人，60-100次/每分钟的测量值通常被视为正常范围，低于60次/每分钟则偏低，高于100次/每分钟则偏高。</p>
                </div>
                <div>
                    <Charts type="bar" data={this.state.heartBeatLists} />
                </div>
            </div>)
    }
}

export default Heart;