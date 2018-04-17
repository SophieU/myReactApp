import React from 'react';
import {List,Toast} from 'antd-mobile';
import axios from '../../api';
import store from '../../state/store';

const Item = List.Item;
class MailBook extends React.Component {
    constructor(){
        super();
        this.state={
            mail:[]
        }
    }
    componentWillMount(){
        const query="openId="+store.device.openId+'&equipmentId='+store.device.equipmentId;
        axios.get('/api/tel/telList?'+query)
            .then(res=>{
                if(res.data.success){
                    // 操作成功
                    const fakeData = [
                        {
                            "equipmentId": "3919752600",
                            "name": "监护甲",
                            "number": "15882365981",
                            "pic": "base64",//头像 base64数据
                            "sort": 1, //排序
                            "id": 1
                        },{
                            "equipmentId": "3919752600",
                            "name": "监护乙",
                            "number": "15882365981",
                            "pic": "base64",
                            "sort": 2,
                            "id": 2
                        },
                    ]
                    // const data =[]
                    this.setState({
                        mail:fakeData
                    })

                }
            })
    }
    render() {
        const datas = this.state.mail
        if(datas.length==0){
            return (<div className="insertShadow">加载中...</div>)
        }else{
            return (
                <div className="insetShadow">
                    <List>
                        {
                            datas.map(item=>(
                                <Item  key={item.id}>
                                    <div className="flexbox list-style">
                                        <img src={require('../../images/defaultAvatar.png')} alt=""/>
                                        <div>
                                            <h4>{item.name}</h4>
                                            <p>{item.number}</p>
                                        </div>
                                    </div>
                                </Item>
                            ))
                        }
                    </List>

                </div>)
        }

    }
}

export default MailBook;