import React from 'react';
import {Link} from 'react-router-dom'
import './index.scss';
import IconLists from './icon-lists';
import LocationIndex from './index-location'
import DevStatu from './dev-status';
import axios from '../../api';
// import PropTypes from 'prop-types';
import {Toast} from 'antd-mobile';
import localStorage from '../../util/storage';
// import Scroll from '../../components/scroll/Scroll';



class Index extends React.Component{

    constructor(){
        super();
        this.state={
            role:'',
            online:false,
            heart:'',
            lnglat:{},
            electricity:0,
            rollCount:0,
            stepsNum:0,
            avatar:'',
            tel:'',
            sol:'',
            deviceList:[],
            bloodPressure:null,
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
                // 用户无equipmentId时表示未注册
                if(!isRegister){
                    // 未注册的跳转
                    // 原生方法
                    const ysyapp = window.ysyapp;
                    if(ysyapp){
                        ysyapp({
                            funName:"bindDevice"
                        })
                    }
                }else{
                    //查询设备列表
                    this.getDeviceList();
                }
            })
    }
    //检测房屋绑定
    checkHouse(id,eqId){
        const ysyAPI = localStorage.getYsyApi();
        axios.get(`${ysyAPI}/api/v1/family/house/isBindEquipment?userId=${id}&equipmentId=${eqId}`)
            .then(res=>{

                if(res.data.code===0){ //请求成功，判断是否绑定过房屋
                    if(res.data.data===false){
                        this.props.history.push('/house')
                    }else{
                        //绑定过房屋
                        // 获取用户信息
                        this.getUserInfo();
                        // 获取手表电话
                        this.getWatchTel();
                        // 获取sos电话
                        this.getSOS();
                    }
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
                 const bloodData = res.data.bloodPressure;
                 if(devData!==null){
                     this.setState({
                         electricity:devData.electricity,
                         lnglat:{
                             latitude:devData.latitude,
                             longitude:devData.longitude
                         },
                         stepsNum:devData.stepsNum,
                         rollCount:devData.rollCount,
                         heartbeat:heartData?heartData.heartbeat:0,
                         bloodPressure:bloodData,
                     })
                 }
             }else{
                 Toast.info(res.data.msg,1)
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
                    Toast.info('设备不在线',1);
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
                    this.setState({
                        tel:res.data.data
                    })
                }else{
                    Toast.info(res.data.msg,1);

                }
            })
    };
    /*查询当前用户信息*/
    getUserInfo=()=>{
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/home/oldmanInfo?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    let data = res.data.data;
                    if(data!==null){
                        localStorage.setHeadImg(data.headimg);
                        this.setState({
                            lnglat:{
                                longitude:data.longitude!==null?data.longitude:'',
                                latitude:data.latitude!==null?data.latitude:''
                            },
                            avatar:data.headimg,
                        })
                    }

                }
            })
            .then(()=>{
                // 查询网络状态
                this.getInternetStatus();
                // 获取设备数据
                this.getDeviceDatas();
                // 获取手表电话
                this.getWatchTel();
                // 获取sos电话
                this.getSOS();
                //获取近期心率数据

            })
    };
    /* loginr后第一步：  绑定的设备列表*/
    getDeviceList(){
        let openId = localStorage.getOpenId();
        axios.get( `/api/home/deviceList?openId=${openId}`)
            .then(res=>{
                if(res.data.success){
                    let equipmentId = localStorage.getEquipmentId();

                    let deviceList = res.data.data;
                    //首次进入eqId为空
                    if(equipmentId===""){
                        localStorage.setEquipmentId(deviceList[0].equipmentId);
                        equipmentId=deviceList[0].equipmentId;
                    }

                    let roleNow='';
                    deviceList.forEach(item=>{
                        if(item.equipmentId===equipmentId){
                            roleNow=item.role;
                            return;
                        }
                    });
                    this.setState({
                        deviceList:deviceList,
                        role:roleNow
                    });
                    let from =this.props.location.params?this.props.location.params.from:'';
                    if(!from){
                        this.checkHouse(openId,equipmentId);
                    }else{
                        // 获取用户信息
                        this.getUserInfo();
                        // 获取手表电话
                        this.getWatchTel();
                        // 获取sos电话
                        this.getSOS();
                    }


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
                    Toast.info(res.data.msg,1)
                }
            })
    };
    //切换角色
    changeRole=(val)=>{
        this.setState({
            role:val.role
        });
        let equipmentId = val.equipmentId;
        localStorage.setEquipmentId(equipmentId);
        this.getUserInfo()
    };

    render(){

        let devStatu = {
            electricity:this.state.electricity,
            roleList:this.state.deviceList,
            role:this.state.role,
            status:this.state.online?'数据连接':'设备不在线',
            headImg:this.state.avatar
        };

        const lnglat = {
            latitude:this.state.lnglat.latitude,
            longitude:this.state.lnglat.longitude
        };
        let iconList = {
            tel:this.state.tel,
            sos:this.state.sos,
        };
        let blood = this.state.bloodPressure!==null?(this.state.bloodPressure.high+'/'+this.state.bloodPressure.low):'';
        let Map ;
        if(window.AMap){
            Map = (<LocationIndex {...lnglat}/>)
        }else{
            Map=(<div>loading...</div>)
        }

        //   <LocationIndex {...lnglat}/>
        return(
            <div>
                <DevStatu {...devStatu} changeRole={this.changeRole}/>
                <div  className="control-panel">
                    <IconLists {...iconList} />
                    {Map}
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
                                <p><strong>{this.state.heartbeat===null?'':this.state.heartbeat}</strong></p>
                                <p>心率</p>
                            </div>
                        </Link>
                        <Link to="/blood" className="link-item">
                            <img alt="" src={require('../../images/pic-blood.png')}/>
                            <div className="link-data">
                                <p><strong>{blood}</strong>mmHg</p>
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