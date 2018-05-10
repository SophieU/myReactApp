import React from 'react';
import {List} from 'antd-mobile';
import delIcon from '../../images/del.png';
import axios from '../../api';
import localStorage from '../../util/storage';
import Nothing from '../../components/nothing/Nothing';

import './mailbook.scss';

const Item = List.Item;
class MailBook extends React.Component {
    constructor(){
        super();
        this.state={
            nothing:false,
            mail:[]
        }
    }
    componentDidMount(){
        const query="openId="+localStorage.getOpenId()+'&equipmentId='+localStorage.getEquipmentId();
        axios.get('/api/tel/telList?'+query)
            .then(res=>{
                if(res.data.success){
                    let data = res.data.data;
                    // 操作成功
                    this.setState({
                        mail:res.data.data,
                        nothing:data.length===0
                    })

                }
            })
    }
    delTel=(id)=>{
      console.log(id)
    };
    render() {
        const mails = this.state.mail;
        return (
            <div className="mail-book">
                <Nothing show={this.state.nothing} title={"您还没有亲情号码哦"}/>
                <List >
                    {
                        mails.map(tel=>(
                            <Item  key={tel.id}>
                                <div className="tel-item">
                                    <div className="left">
                                        <img src={"data:image/jpg;base64,"+tel.pic} alt="avatar"/>
                                        <div>
                                            <h4>{tel.name}</h4>
                                            <p>{tel.number}</p>
                                        </div>
                                    </div>
                                    <div className="right" onClick={()=>this.delTel(tel.id)}>
                                        <img src={delIcon} alt=""/>
                                        <div>删除</div>
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