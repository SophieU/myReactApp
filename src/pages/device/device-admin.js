import React from 'react';
import './device.scss';
import {List,Icon} from 'antd-mobile';

const Item = List.Item;
class Test extends React.Component {
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
                                extra={<button onClick={(e)=>{this.deleteDevice(item.id)}} className="delete-btn">删除</button>}
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