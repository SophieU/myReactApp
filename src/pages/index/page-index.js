import React from 'react';
import {Link} from 'react-router-dom'
import './index.scss';
import IconLists from './icon-lists';
import LocationIndex from './index-location'
import DevStatu from './dev-status';
import axios from '../../api';
import PropTypes from 'prop-types';
import {Toast} from 'antd-mobile';
import localStorage from '../../util/storage';
import Scroll from '../../components/scroll/Scroll';

// 原生方法
const ysyapp = window.ysyapp;


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
            lnglat:{},
            electricity:0,
            rollCount:0,
            stepsNum:0,
            userInfo:{},
            tel:'',
            sol:'',
            deviceList:[],
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
        this.openId = localStorage.getOpenId(); // app初始化时已获取
        this.checkLogin(this.openId);
    }
    checkLogin(openId){
        // 检测当前openId是否已注册设备(登录)
        axios.get('/api/userLogin?openId='+openId)
            .then(res=>{
                const isRegister = res.data.success;
                if(!isRegister){
                    // 未注册的跳转
                    if(ysyapp){
                        ysyapp({
                            funName:"bindDevice"
                        })
                    }else{
                        this.context.router.history.push('/register')
                    }
                }else{
                    const deviceData = res.data.data;
                    localStorage.setEquipmentId(deviceData.equipmentId);
                    // localStorage.setItem('equipmentId',deviceData.equipmentId);
                    this.setState({
                        role:deviceData.role
                    });
                    //查询设备列表
                    this.getDeviceList();
                    // 查询网络状态
                    this.getInternetStatus();
                    // 获取设备数据
                    this.getDeviceDatas();
                    // 获取手表电话
                    this.getWatchTel();
                    // 获取用户信息
                    this.getUserInfo();
                    // 获取sos电话
                    this.getSOS();
                }
            })
    }
    // 获取设备信息
    getDeviceDatas=()=>{
        const openId = this.openId;
        const equipmentId = localStorage.getEquipmentId();
        const query = 'openId='+openId+'&equipmentId='+equipmentId;
        axios.get('/api/home/deviceData?'+query)
            .then(res=>{
             if(res.data.success){
                 const devData = res.data.data;
                 const heartData = res.data.heart;
                 this.setState({
                     electricity:devData.electricity,
                     lnglat:{
                         latitude:devData.latitude,
                         longitude:devData.longitude
                     },
                     stepsNum:devData.stepsNum,
                     rollCount:devData.rollCount,
                     heartbeat:heartData
                 })
                 this.setState({
                     deviceData:devData,
                     heart:heartData
                 })
             }else{
                 console.log(res.data.msg)
             }

            })
    }
    // 查询设备网络状态
    getInternetStatus=()=>{
        const openId = this.openId;
        const equipmentId = localStorage.getEquipmentId();
        const query = 'openId='+openId+'&equipmentId='+equipmentId;
        axios.get('/api/home/deviceStatus?'+query)
            .then(res=>{
                if(!res.data.success){
                    Toast.info('设备不在线');
                }
                this.setState({
                    online:res.data.success
                })

            })
    };
    /*查询手表电话*/
    getWatchTel=()=>{
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/home/oldmanphone?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.data)
                    this.setState({
                        tel:res.data.data
                    })
                }else{
                    Toast.info(res.data.msg);

                }
            })
    };
    /*查询当前用户信息*/
    getUserInfo=()=>{
        let openId = localStorage.getOpenId();
        axios.get(`/api/home/userInfo?openId=${openId}`)
            .then(res=>{
                if(res.data.success){
                    this.setState({
                        userInfo:res.data.data
                    })
                }
            })
    };
    /*绑定的设备列表*/
    getDeviceList(){
        let openId = localStorage.getOpenId();
        axios.get( `/api/home/deviceList?openId=${openId}`)
            .then(res=>{
                if(res.data.success){
                    this.setState({
                        deviceList:res.data.data
                    })
                }
            })
    }
    /*查询sos电话*/
    getSOS=()=>{
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/home/getSos?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    this.setState({
                        sos:res.data.sos1
                    })
                }else{
                    Toast.info(res.data.msg)
                }
            })
    };
    //切换角色
    changeRole=(val)=>{
        this.setState({
            role:val
        });
        let openId = localStorage.getOpenId();
        let equipmentId = '77795474';
        axios.get(`/api/home/oldmanInfo?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                console.log(res.data)
            })
    };
    render(){
        let devStatu = {
            electricity:this.state.electricity,
            roleList:this.state.deviceList,
            status:this.state.online?'数据连接':'设备不在线',
            headImg:this.state.userInfo.headImg
        };
        const lnglat = {
            latitude:this.state.lnglat.latitude,
            longitude:this.state.lnglat.longitude
        };
        let iconList = {
            tel:this.state.tel,
            sos:this.state.sos
        };

        return(
            <div>
                <DevStatu {...devStatu} changeRole={this.changeRole}/>
                <div className="control-panel">
                    <IconLists {...iconList} />
                    <LocationIndex {...lnglat}/>
                    <div className="watch-link">
                        <Link to="/walk" className="link-item">
                            <img alt="" src={require('../../images/pic-walk.png')}/>
                            <div className="link-data">
                                <p><strong>{this.state.stepsNum}</strong>步</p>
                                <p>计步</p>
                            </div>
                        </Link>
                        <Link to="/heartbeat" className="link-item">
                            <img alt="" src={require('../../images/pic-heartbeat.png')}/>
                            <div className="link-data">
                                <p><strong>{this.state.heart===null?'':this.state.heart.heartbeat}</strong></p>
                                <p>心率</p>
                            </div>
                        </Link>
                        <Link to="/blood" className="link-item">
                            <img alt="" src={require('../../images/pic-blood.png')}/>
                            <div className="link-data">
                                <p><strong>{this.state.bloodPressure}</strong>mmHg</p>
                                <p>血压</p>
                            </div>
                        </Link>
                        <Link to="/sleep" className="link-item">
                            <img alt="" src={require('../../images/pic-sleep.png')}/>
                            <div className="link-data">
                                <p><strong>{this.state.rollCount}</strong>次</p>
                                <p>睡眠翻身次数</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Index;