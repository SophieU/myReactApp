import React from 'react';
import {Link} from 'react-router-dom'
import './index.scss';
import IconLists from './icon-lists';
import LocationIndex from './index-location'
import DevStatu from './dev-status';
import axios from '../../api';
import PropTypes from 'prop-types';
import store from '../../state/store';
import {Toast} from 'antd-mobile'

//健康模块
const WatchLink=(props)=>{
    return(
        <div className="watch-link">
            <Link to="/walk" className="link-item">
                <img alt="" src={require('../../images/pic-walk.png')}/>
                <div className="link-data">
                    <p><strong>{props.stepsNum}</strong>步</p>
                    <p>计步</p>
                </div>
            </Link>
            <Link to="/heartbeat" className="link-item">
                <img alt="" src={require('../../images/pic-heartbeat.png')}/>
                <div className="link-data">
                    <p><strong>{props.heart}</strong></p>
                    <p>心率</p>
                </div>
            </Link>
            <Link to="/blood" className="link-item">
                <img alt="" src={require('../../images/pic-blood.png')}/>
                <div className="link-data">
                    <p><strong>{props.bloodPressure}</strong>mmHg</p>
                    <p>血压</p>
                </div>
            </Link>
            <Link to="/sleep" className="link-item">
                <img alt="" src={require('../../images/pic-sleep.png')}/>
                <div className="link-data">
                    <p><strong>{props.rollCount}</strong>次</p>
                    <p>睡眠翻身次数</p>
                </div>
            </Link>
        </div>
    )
};

class Index extends React.Component{
    static contextTypes ={
        router:PropTypes.object
    }
    constructor(){
        super();
        this.state={
            role:'',
            online:false,
            heart:0,
            deviceData:{
                electricity:0,
                latitude:0,
                longitude:0,
                rollCount:0,
                stepsNum:0,
                bloodPressure:'90/80'
            }
        }
    }
    componentDidMount(){
        // 检测当前openId是否已注册设备
        axios.get('/api/userLogin?openId=83fedff0-4d54-4a02-a0a4-787c7d1b9df3')
            .then(res=>{
                const isRegister = res.data.success;
                if(!isRegister){
                    // 未注册的跳转
                    this.context.router.history.push('/register')
                    // console.log(_this.context.router)
                    // console.log(Route)
                }else{
                    const deviceData = res.data.data;
                    store.device.openId=deviceData.openId;
                    store.device.equipmentId=deviceData.equipmentId;
                    store.device.role=deviceData.role;
                    this.setState({
                        role:deviceData.role
                    });
                    this.getInternetStatus();
                    this.getDeviceDatas();
                }
            })
    }
    getDeviceDatas=()=>{
        const query = 'openId='+store.device.openId+'&equipmentId='+store.device.equipmentId;
        axios.get('/api/home/deviceData?'+query)
            .then(res=>{
                const fakeData = {
                    success: true, // true成功   false 失败
                    msg: "成功", // 返回信息消息
                    heart:89,//心率测试 为null则没有测试
                    data:{//数据
                        "createTime": 1499223209000, //创建时间戳
                            "equipmentId": "3919752600",//设备Id
                            "latitude": "30.655078",//纬度
                            "longitude": "104.0667117",//经度
                            "electricity": 81,//电量
                            "rollCount": 511,//翻滚次数
                            "stepsNum": 1369,//记步数
                            "time": "2017-07-05 10:53:29",//时间
                            "bloodPressure":"90/80"
                    }
            }
            // const data = res.data.data;
                const heart = fakeData.heart;
                const deviceData = fakeData.data;
                this.setState({
                    deviceData:deviceData,
                    heart:heart
                })
            })
    }
    getInternetStatus=()=>{
        const query = 'openId='+store.device.openId+'&equipmentId='+store.device.equipmentId;
        axios.get('/api/home/deviceStatus?'+query)
            .then(res=>{
                if(!res.data.success){
                    Toast.info('设备不在线');
                }
                this.setState({
                    online:res.data.success
                })

            }).then(()=>{
        })
    }
    //切换角色
    changeRole=(val)=>{
        this.setState({
            role:val
        })
    }
    render(){
        let devStatu = {
            electricity:this.state.deviceData.electricity,
            role:this.state.role,
            status:this.state.online?'数据连接':'设备不在线'
        };
        const lnglat = {
            latitude:this.state.deviceData.latitude,
            longitude:this.state.deviceData.longitude
        };

        const healthData = {
            heart:this.state.heart,
            rollCount:this.state.deviceData.rollCount,
            stepsNum:this.state.deviceData.stepsNum,
            bloodPressure:this.state.deviceData.bloodPressure
        };
        return(
            <div>
                <DevStatu {...devStatu}changeRole={this.changeRole}/>
                <div className="control-panel">
                    <IconLists />
                    <LocationIndex {...lnglat}/>
                    <WatchLink {...healthData}/>
                </div>
            </div>
        )
    }
}
export default Index;