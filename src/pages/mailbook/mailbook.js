import React from 'react';
import {List,Toast} from 'antd-mobile';
import delIcon from '../../images/del.png';
import axios from '../../api';
import localStorage from '../../util/storage';
import Nothing from '../../components/nothing/Nothing';
import {Route} from 'react-router-dom';
import AddMail from './add-mail';

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
    delTel=(e,equipmentId,sort,index)=>{
        e.stopPropagation();
        let openId = localStorage.getOpenId();
        let paraStr = `?openId=${openId}&equipmentId=${equipmentId}&sort=${sort}`;
        axios.get('/api/tel/delTel'+paraStr)
            .then(res=>{
                if(res.data.success){
                    Toast.info('删除成功');
                    let newMail = Object.assign({},this.state.mail);
                    newMail.splice(index,1);
                    this.setState({
                        mail:newMail
                    })
                }else{
                    Toast.info(res.data.msg)
                }
                console.log(res.data)
            })


    };
    toMailDetail=(id)=>{
        this.props.history.push('/mail-book/'+id);

    };
    render() {
        const mails = this.state.mail;
        let match=this.props.match;

        return (
            <div className="mail-book" >
                <Nothing show={this.state.nothing} title={"您还没有亲情号码哦"}/>
                <List >
                    {
                        mails.map((tel,index)=>(
                            <Item  key={tel.id}>
                                <div className="tel-item" onClick={()=>this.toMailDetail(tel.id)}>
                                    <div className="left">
                                        <img src={"data:image/jpg;base64,"+tel.pic} alt="avatar"/>
                                        <div>
                                            <h4>{tel.name}</h4>
                                            <p>{tel.number}</p>
                                        </div>
                                    </div>
                                    <div className="right" onClick={(e)=>this.delTel(e,tel.equipmentId,tel.sort,index)}>
                                        <img src={delIcon} alt=""/>
                                        <div>删除</div>
                                    </div>
                                </div>
                            </Item>
                        ))
                    }
                </List>
                <Route path={`${match.url+'/:id'}`} component={AddMail}/>
            </div>)

    }
}

export default MailBook;