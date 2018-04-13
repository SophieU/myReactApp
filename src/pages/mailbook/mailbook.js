import React from 'react';
import {List} from 'antd-mobile';

const Item = List.Item;
class MailBook extends React.Component {
    render() {
        const mockdatas = [
            {
                avatarUrl:'xxxx',
                name:'大伯',
                tel:'13567890987',
                id:'1'
            },{
                avatarUrl:'xxxx',
                name:'马建国',
                tel:'18609876543',
                id:'2'
            }
        ]
        return (
            <div className="insetShadow">
                <List>
                    {
                        mockdatas.map(item=>(
                            <Item  key={item.id}>
                                <div className="flexbox list-style">
                                    <img src={require('../../images/defaultAvatar.png')} alt=""/>
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>{item.tel}</p>
                                    </div>
                                </div>
                            </Item>
                        ))
                    }
                </List>

            </div>)
    }
}

export default MailBook;