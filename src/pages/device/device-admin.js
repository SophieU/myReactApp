import React from 'react';
import localStorage from '../../util/storage';
import axios from '../../api';
import {List,Modal,Toast} from 'antd-mobile';
import delImg from '../../images/del.png';

import './device.scss';

const Item = List.Item;
const alert = Modal.alert;
class DeviceAdmin extends React.Component {
    constructor(){
        super();
        this.state={
            deviceLists:[]
        }
    }
    componentDidMount(){
        let openId = localStorage.getOpenId();
        axios.get('/api/home/deviceList?openId='+openId)
            .then(res=>{
               let result = res.data;
               if(result.success){
                   this.setState({
                       deviceLists:result.data
                   })
               }
            });

    }
    deleteAlert(equipmentId,name){
        let tips = '确认要删除'+name+'吗？';
        alert('提示',tips,[
            {text:'取消',onPress:()=>console.log('取消删除')},
            {text:'确定',onPress:()=>this.deleteDevice(equipmentId)}
        ])
    }
    deleteDevice(equipmentId){
        let openId = localStorage.getOpenId();

            axios.get(`/api/deviceManage/delOneDevice?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('删除成功',1);
                    let deviceLists = this.state.deviceLists;
                    let newlists =deviceLists.filter((item)=>{
                        if(item.equipmentId!==equipmentId){
                            return true;
                        }
                    });
                   this.setState({
                       deviceLists:newlists
                   },function(){
                       if(newlists.length===0){
                           //删空了
                           if(window.ysyapp){
                               window.ysyapp({
                                   funName:"bindDevice",
                                   data:{
                                       empty:true, //表示当前用户删除了所有设备，不能再返回到H5中
                                   }
                               })
                           }else{
                               this.props.history.push('/register')
                           }

                       }
                   });
                    // window.location.reload();
                }else{
                    Toast.info(res.data.msg,1)
                }
            })
    }
    render() {

        return (
            <div>
                <List>
                    {
                        this.state.deviceLists.map(device=>(
                            <Item
                                key={device.id}
                                extra={<button onClick={(e)=>{this.deleteAlert(device.equipmentId,device.role)}} className="delete-btn">
                                    <img src={delImg} alt=""/>
                                    <p>删除</p></button>}
                            >
                            <div className="device-info flexbox">
                                <img src={require('../../images/defaultAvatar.png')} alt=""/>
                                <div>
                                    <h4>{device.role}</h4>
                                    <p>{device.equipmentId}</p>
                                </div>
                            </div>
                        </Item>))
                    }

                </List>
            </div>)
    }
}

export default DeviceAdmin;