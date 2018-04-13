import React from 'react';
import {Link} from 'react-router-dom'

class IconList extends React.Component {
    
    render() {
        const iconsData = [
            {
                iconUrl:require('../../images/icon-mailbook.png'),
                title:'通讯录',
                url:'/mail-book',
            },{
                iconUrl:require('../../images/icon-chat.png'),
                title:'微聊',
                url:'/chat',
            },{
                iconUrl:require('../../images/icon-call.png'),
                title:'电话',
                url:'/call',
            },{
                iconUrl:require('../../images/icon-120.png'),
                title:'急救',
                url:'/120'
            },{
                iconUrl:require('../../images/icon-medicine.png'),
                title:'提醒',
                url:'/medicine',
            },{
                iconUrl:require('../../images/icon-mine.png'),
                title:'我的',
                url:'/medicine',
            }
        ]

        return (
            <div>
                <ul className="icon-lists">
                    {
                        iconsData.map((icon,index)=>{
                            return(
                                <li key={index} className="icon-item">
                                    <Link to={icon.url}>
                                        <img src={icon.iconUrl}/>
                                        <span className="icon-title">{icon.title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>)
    }
}

export default IconList;