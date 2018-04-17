import React from 'react';
import {List,InputItem,Button,WhiteSpace,WingBlank} from 'antd-mobile';
import {createForm} from 'rc-form';
import './mailbook.scss'

class AddMail extends React.Component {
    constructor(){
        super();
        this.state={
            imgFile:'',
            nickName:'',
            tel:''
        }
    }
    submit=()=>{

    };
    fileChanged=(e)=>{
        const file = e.target.files[0];
        var reader = new FileReader();
        console.log(this.refs.uploadImg)
        reader.onload= (e)=>{
            this.refs.uploadImg.src=e.target.result;
        };
        reader.readAsDataURL(file);
        // console.log(e.target.files[0])
    };
    render() {
        return (
            <div className="add-mail">
                <div className="upload-block">
                    <img src={require('../../images/defaultAvatar.png')} ref="uploadImg" alt=""/>
                    <input name="image" value={this.state.imgFile} onChange={this.fileChanged} accept="image/*" className="upload-input" type="file"/>
                </div>
                <List>
                    <InputItem placeholder="请输入昵称" ><span className="form-label">昵称</span></InputItem>
                    <InputItem placeholder="请输入电话号码"><span className="form-label">电话号码</span></InputItem>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button onClick={this.submit} type="primary">保存</Button>
                </WingBlank>

            </div>)
    }
}

export default AddMail;