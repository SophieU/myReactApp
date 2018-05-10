import React from 'react';
import './device.scss';
import {List,Modal} from 'antd-mobile';

const Item = List.Item;
const alert = Modal.alert;
class Test extends React.Component {
    componentDidMount(){
        
    }
    deleteAlert(id,name){
        let tips = '确认要删除'+name+'吗？';
        alert('提示',tips,[
            {text:'取消',onPress:()=>console.log('取消删除')},
            {text:'确定',onPress:()=>this.deleteDevice(id)}
        ])
    }
    deleteDevice(id){
        console.log(id)
    }
    render() {
        const mockDevices=[
            {
                avatar:'../../images/defaultAvatar.png',
                name:'大伯',
                code:'234556678564',
                id:'a15846523asdf'
            },{
                avatar:'../../images/defaultAvatar.png',
                name:'二姑父',
                code:'234556678564',
                id:'4a2w4sdf'
            }
        ]

        return (
            <div>
                <List>
                    {
                        mockDevices.map(item=>(
                            <Item
                                key={item.id}
                                extra={<button onClick={(e)=>{this.deleteAlert(item.id,item.name)}} className="delete-btn">删除</button>}
                            >
                            <div className="device-info flexbox">
                                <img src={require('../../images/defaultAvatar.png')} alt=""/>
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>{item.code}</p>
                                </div>
                            </div>
                        </Item>))
                    }

                </List>
            </div>)
    }
}

export default Test;