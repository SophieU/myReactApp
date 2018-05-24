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
                   console.log(result.data)
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
                console.log(res.data)
                if(res.data.success){
                    Toast.info('删除成功',1);
                    window.location.reload();
                }else{
                    Toast.info(res.data.msg)
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