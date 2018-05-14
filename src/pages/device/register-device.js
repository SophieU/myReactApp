import React from 'react';
import './device.scss';
import {createForm} from 'rc-form';
import {List,InputItem,Toast,Button} from 'antd-mobile';
import axios from '../../api';
import localStorage from '../../util/storage';

class BasicRegister extends React.Component{

    constructor(){
        super();
        this.state={
            devCode:'',
            devName:'',
            authCode:'',
        }
    }
    componentDidMount(){
        // this.checkReg()
    }
    checkReg=()=>{
        const fromPath = this.context.router;
        //检测设备是否注册
        axios.get('/api/checkRegCode?code=439019875297094')
            .then(res=>{
                const result = res.data.success;
                if(!result){
                    Toast.info(res.data.msg,1)
                    // this.context.router.history.push('/')
                }
                console.log(res)
            })
    }
    submitReg=()=>{
        let regCode = this.state.devCode;
        let deviceName = this.state.devName;
        let authCode = this.state.manCode;
        if(regCode===""||deviceName===""||authCode===""){
            Toast.info('请完整填写再提交')
        }
        let openId = localStorage.getOpenId();
        let paramStr = `?regCode=${regCode}&deviceName=${deviceName}&authCode=${authCode}&openId=${openId}`

        /*const query = 'regCode=439019875297094' +
                      '&openId=83fedff0-4d54-4a02-a0a4-787c7d1b9df3' +
                      '&deviceName=sophia' +
                      '&manCode=77795474';*/

        // 注册设备
        axios.get('/api/userReg'+paramStr,).then(res=>{
                const result = res.data.success;
                if(result){
                    Toast.info(res.data.msg,1);
                    const _this = this;
                    setTimeout(()=>{
                        this.prop.history.push('/')
                    },1000)

                }else{
                    Toast.info(res.data.msg,1)
                }
        })
    };
    onChange=(value,stateName)=>{
        this.setState({
            [stateName]:value
        });
    };
    render(){
        // const {getFiledProps}=this.props.form
        return(<div className="login-panel">
            <img className="login-bg" src={require('../../images/pic-register.png')} alt=""/>
            <List className="form-wrapper">
                <div className="flexbox">
                    <InputItem
                        type="text"
                        placeholder="请输入设备注册码"
                         value={this.state.devCode}
                        // error={this.state.hasError}
                        // onErrorClick={this.onErrorClick}
                        onChange={(value)=>this.onChange(value,'devCode')}
                    />
                    <div className="scan-btn">
                        <img src={require('./scan.png')} alt=""/>
                        <span>扫描二维码</span>
                    </div>

                </div>
                <InputItem
                    type="text"
                    placeholder="请输入设备名称"
                    value={this.state.devName}
                    // value="sophia"
                    // error={this.state.hasError}
                    // onErrorClick={this.onErrorClick}
                    onChange={(value)=>this.onChange(value,'devName')}
                />
                <InputItem
                    type="text"
                    placeholder="管理码"
                    value={this.state.authCode}
                    // error={this.state.hasError}
                    // onErrorClick={this.onErrorClick}
                    onChange={(value)=>this.onChange(value,'authCode')}
                />
                <Button type="primary" onClick={this.submitReg}>注册设备</Button>
            </List>
            <p>添加设备表示您已同意并遵守安心桥服务条款</p>
        </div>)
    }
}
const Register = createForm()(BasicRegister);
export default Register;