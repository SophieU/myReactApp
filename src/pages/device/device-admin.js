import React from 'react';
import localStorage from '../../util/storage';
import axios from '../../api';
import {List,Modal} from 'antd-mobile';

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
        console.log(openId)
    }
    deleteAlert(id,name){
        let tips = '确认要删除'+name+'吗？';
        alert('提示',tips,[
            {text:'取消',onPress:()=>console.log('取消删除')},
            {text:'确定',onPress:()=>this.deleteDevice(id)}
        ])
    }
    deleteDevice(id){
        console.log('无删除设备接口')
    }
    render() {

        return (
            <div>
                <List>
                    {
                        this.state.deviceLists.map(device=>(
                            <Item
                                key={device.id}
                                extra={<button onClick={(e)=>{this.deleteAlert(device.id,device.role)}} className="delete-btn">删除</button>}
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