import React from 'react';
import {List,InputItem,Button,WhiteSpace,WingBlank,Toast} from 'antd-mobile';
import axios from '../../api';
import localStorage from '../../util/storage';
import {CSSTransition} from 'react-transition-group';
import Header from '../../components/header/header';

import './mailbook.scss';

class AddMail extends React.Component {

    constructor(){
        super();
        this.state={
            imgFile:'',
            nickName:'',
            tel:'',
            show:false,
        }
    }
    submit=()=>{
        const router = this.props.history;

        const file = this.refs.uploadInput.files;

        const name = this.state.nickName;
        const tel = this.state.tel;
        const openId = localStorage.getOpenId();
        const equipmentId = localStorage.getEquipmentId();
        var formData = new FormData();
        formData.append('file',file[0]);
        formData.append('name',name);
        formData.append('number',tel);
        formData.append('openId',openId);
        formData.append('equipmentId',equipmentId);
        let config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        };
        axios.post('/api/tel/saveOrUpdate',formData,config).then(res=>{
           if(res.data.success){
               Toast.info(res.data.msg);
               router.push('/mail-book')
           }else{
               Toast.info(res.data.msg)
           }
        })

    };
    // 图片回显
    fileChanged=(e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload= (e)=>{
            this.refs.uploadImg.src=e.target.result;
        };
        reader.readAsDataURL(file);
    };
    telInput=(value)=>{
        let telReg = /^1\d{10}/;
        if(value.replace(/\s/g,'').length<11&&!telReg.test(value)){
            this.setState({
                hasErrorTel:true
            })
        }else{
            this.setState({
                hasErrorTel:false
            })
        }
        this.setState({
            tel:value
        })
    };
    nickNameInput=(value)=>{
        if(value.length===0||value.length>10){
            this.setState({
                hasErrorName:true
            })
        }else{
            this.setState({
                hasErrorName:false
            })
        }
        this.setState({
            nickName:value
        })
    }
    render() {
        return (
            <CSSTransition in={this.state.show} timeout={300} classNames="transition">
                <div className="add-mail">
                    <div className="upload-block">
                        <img src={require('../../images/defaultAvatar.png')} ref="uploadImg" alt=""/>
                        <input ref="uploadInput" name="image"  onChange={this.fileChanged} accept="image/*" className="upload-input" type="file"/>
                    </div>
                    <List>
                        <InputItem error={this.state.hasErrorName} onChange={this.nickNameInput} placeholder="请输入昵称" ><span className="form-label">昵称</span></InputItem>
                        <InputItem error={this.state.hasErrorTel} onChange={this.telInput} placeholder="请输入电话号码"><span className="form-label">电话号码</span></InputItem>
                    </List>
                    <WingBlank>
                        <WhiteSpace />
                        <Button onClick={this.submit} type="primary">保存</Button>
                    </WingBlank>

                </div>
            </CSSTransition>
            )
    }
}

export default AddMail;