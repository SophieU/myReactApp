import React from 'react';
import ReactDOM from 'react-dom';
import {List,InputItem,Button,WhiteSpace,WingBlank,Toast} from 'antd-mobile';
import axios from '../../api';
import localStorage from '../../util/storage';
import {CSSTransition} from 'react-transition-group';
import defaultAvatar from '../../images/defaultAvatar.png';

import './mailbook.scss';

class AddMail extends React.Component {

    constructor(){
        super();
        this.state={
            imgFile:'',
            nickName:'',
            tel:'',
            show:false,
            validInput:false, //标识是否已输入
            imgSelected:false, //标识是否已上传图片
        }
    }
    componentDidMount(){
        this.setState({
            show:true
        });
        let mailType = this.props.match.params.id;
        if(mailType!=="add"&&mailType!==''){
            // 修改或查看详情
            this.findTel(mailType);
        }
    }
    componentWillUnmount(){
        this.props.loadLists()
    }
    findTel=(id)=>{
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        let queryString = `?openId=${openId}&equipmentId=${equipmentId}&id=${id}`;

        axios.get('/api/tel/findOne'+queryString)
            .then(res=>{
                if(res.data.success){
                    let result = res.data.data;
                    this.setState({
                        nickName:result.name,
                        tel:result.number,
                        pic:"data:image/jpg;base64,"+result.pic,
                        id:result.id,
                        validInput:true,
                    },function(){
                        let fileInput = ReactDOM.findDOMNode(this.refs.uploadInput);
                        let file = this.base64ToBlob(this.state.pic);
                        fileInput.defaultValue=file;
                    })
                }

            })
    };
    submit=()=>{
        const router = this.props.history;

        const file = this.refs.uploadInput.files;

        const name = this.state.nickName;
        const tel = this.state.tel;
        const openId = localStorage.getOpenId();
        const equipmentId = localStorage.getEquipmentId();
        let formData = new FormData();

        if(this.state.id){
            formData.append('id',this.state.id)
        }
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
               Toast.info(res.data.msg,1);
               router.goBack();
           }else{
               Toast.info(res.data.msg,1);
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
        this.setState({
            imgSelected:true
        })
    };
    telInput=(value)=>{
        let telReg = /^1[3456789]\d{9}$/;
        if(/\D/.test(value)){
            Toast.info('请输入数字');
            return false;
        }
        if(value.length>11){
            Toast.info('手机号超长了');
            return false;
        }
        if(!telReg.test(value)&&value.length===11){
            Toast.info('请输入正确的手机号',1);
        }
        this.setState({
            tel:value
        },()=>{
            this.checkValid();
        });

    };
    nickNameInput=(value)=>{
        console.log(455)
        let reg = /^[\w\u4e00-\u9fa5]+$/;
        if(reg.test(value)||value===''){
            if(value.length>6) {
               Toast.info('最多6位',1);
                return;
            }
            this.setState({
                nickName:value
            },()=>{
                this.checkValid()
            })
        }else{
            Toast.info('昵称输入有误，请输入汉字,字母,数字或下划线',2);
            return false;
        }
    };
    inputVal=(value)=>{
        this.setState({
            nickName:value
        })
    };
    base64ToBlob=(urlData) =>{
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });
    }
    checkValid(){
        let nickName= this.state.nickName;
        let tel = this.state.tel;
        let telReg = /^1[3456789]\d{9}$/;

        if(nickName!==''&&telReg.test(tel)){
            this.setState({
                validInput:true
            })
        }else{
            this.setState({
                validInput:false
            })
        }
    }
    render() {
        return (
            <CSSTransition in={this.state.show} timeout={300} classNames="transition">
                <div className="add-mail">
                    <div className="upload-block">
                        <img src={this.state.pic?this.state.pic:defaultAvatar} ref="uploadImg" alt="avatar"/>
                        <input  ref="uploadInput" name="image"  onChange={this.fileChanged} accept="image/*" className="upload-input" type="file"/>
                    </div>
                    <List>
                        <InputItem value={this.state.nickName}  onChange={this.inputVal} onBlur={this.nickNameInput} placeholder="仅支持字母数字汉字下划线，最多6位" ><span className="form-label">昵称</span></InputItem>
                        <InputItem value={this.state.tel}  onChange={this.telInput} placeholder="请输入电话号码"><span className="form-label">电话号码</span></InputItem>
                    </List>
                    <WingBlank>
                        <WhiteSpace />
                        <Button disabled={!this.state.validInput} onClick={this.submit} type="primary">保存</Button>
                    </WingBlank>

                </div>
            </CSSTransition>
            )
    }
}

export default AddMail;