import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';
import axios from '../../api';
import localStorage from '../../util/storage';
import {Toast} from 'antd-mobile';

class Blood extends React.Component {
    constructor(){
      super();
      this.state={
          measuring:false,
          high:120,
          low:80,
          bloodLists:[]
      }
    };
    componentDidMount(){
        this.openId= localStorage.getOpenId();
        this.equipmentId = localStorage.getEquipmentId();
        this.getMonth();
    }
    //当月血压信息列表
    getMonth=()=>{
        axios.get(`/api/bloodPressure/getListOfCurrMonth?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    // let data = res.data.data;
                    let data = [{
                        "age": "46",
                        "createTime": "2018-06-06 19:59:52",//测量上传的时间
                        "equipmentId": "3922571752",
                        "height": "163",//身高 厘米
                        "high": "109",        //血压之高压值
                        "id": 2,
                        "low": "81",          //血压之低压值
                        "sex": "1",//性别 1男2女
                        "weight": "65"//体重
                    },
                        {
                            "age": "46",
                            "createTime": "2018-06-07 18:57:52",
                            "equipmentId": "3922571752",
                            "height": "163",
                            "high": "108",
                            "id": 3,
                            "low": "75",
                            "sex": "1",
                            "weight": "65"
                        }]
                    data = data.map((item,index)=>{
                        let date = new Date(item.createTime).getDate();
                        let itemData = {};
                        itemData.high=item.high;
                        itemData.low=item.low;
                        return {
                            date:date,
                            itemData:itemData
                        }
                    });
                    this.setState({
                        bloodLists:data
                    })
                }else{
                    Toast.info(res.data.msg)
                }
            })
    }
    measure=()=>{
        axios.get(`/api/bloodPressure/measure?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('测量指令发送成功，请等待40s后查看结果',2);
                    this.setState({
                        measuring:true
                    })
                    setTimeout(function(){
                        // 获取测量结果
                    },40000)
                }else{
                    Toast.info(res.data.msg)
                }
            })
    };
    render() {

        return (
            <div className="blood">
                <HealthHeader now="血压" />
                <DataBall now="血压"
                          measure={this.measure}
                          measuring={this.state.measuring}
                          high={this.state.high}
                          low={this.state.low}
                          danger={this.state.blood!==null&&(this.state.blood<60||this.state.heartbeat>100)}
                />
                <div className="blood-intro">
                    <h4>温馨提示</h4>
                    <p>对于成年人，高于90/60mmHg且低于140/90mmHg的测量值通常被视为正常范围。</p>
                </div>
                <div>
                    <Charts  type="line" data={this.state.bloodLists}/>
                </div>
            </div>)
    }
}

export default Blood;