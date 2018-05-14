import React from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'antd-mobile';

const alert = Modal.alert;

class IconList extends React.Component {
    callPhone=(tel)=>{
        if(!tel){
            alert('提醒','当前手表未设置电话')
        }else{
            alert('提醒', '确认拔打电话'+tel+'???', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确认', onPress: () => window.location.href="tel:"+tel},
            ])
        }

    };
    goMine=()=>{
        alert('跳转到我的')
    };
    goChat=()=>{
        const ysyapp = window.ysyapp;
       if(ysyapp){
           ysyapp({
               funName:"chatRoom",
               data:"",
           })
       }else{
           alert('跳转到微聊')
       }

    };
    render() {
        const iconsData = [
            {
                iconUrl:require('../../images/icon-mailbook.png'),
                title:'通讯录',
                url:'/mail-book',
            },{
                iconUrl:require('../../images/icon-chat.png'),
                title:'微聊',
                type:'alert',
                handle:this.goChat
            },{
                iconUrl:require('../../images/icon-call.png'),
                title:'电话',
                type:'alert',
                handle:this.callPhone,
                tel:this.props.tel
            },{
                iconUrl:require('../../images/icon-120.png'),
                title:'急救',
                type:'alert',
                handle:this.callPhone,
                tel:this.props.sos
            },{
                iconUrl:require('../../images/icon-medicine.png'),
                title:'提醒',
                url:'/medicine',
            },{
                iconUrl:require('../../images/icon-mine.png'),
                title:'我的',
                type:'alert',
                handle:this.goMine
            }
        ]

        return (
            <div>
                <ul className="icon-lists">
                    {
                        iconsData.map((icon,index)=>{
                            return(
                                <li key={index} className="icon-item">
                                    {
                                     icon.type==='alert'?
                                         (<div onClick={()=>icon.handle(icon.tel)}>
                                             <img src={icon.iconUrl}/>
                                             <span className="icon-title">{icon.title}</span>
                                         </div>):
                                         (<Link to={icon.url}>
                                             <img src={icon.iconUrl}/>
                                             <span className="icon-title">{icon.title}</span>
                                         </Link>)
                                    }

                                </li>
                            )
                        })
                    }

                </ul>
            </div>)
    }
}

export default IconList;