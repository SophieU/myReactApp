import React from 'react';
import './device.scss';
import {createForm} from 'rc-form';
import {List,InputItem,Toast,Button,Picker} from 'antd-mobile';
import axios from '../../api';
import localStorage from '../../util/storage';
import PropTypes from 'prop-types';

class BasicRegister extends React.Component{
    static contextTypes= {
        router:PropTypes.object
    }
    constructor(){
        super();
        this.state={
            devCode:'',
            devName:[], //picker值
            authCode:'',
            family:[],
        }
    }
    componentDidMount(){
        // this.checkReg()
        this.getMember();
    }
    checkReg=(value)=>{
        //检测设备是否注册
        axios.get(`/api/checkRegCode?code=${value}`)
            .then(res=>{
                const result = res.data.success;
                if(!result){
                    Toast.info(res.data.msg,1)
                    // this.context.router.history.push('/')
                }
                console.log(res.data)
            })
    };
    getMember=()=>{
        let userId = localStorage.getOpenId();
        let ysyApi = localStorage.getYsyApi();
        axios.get(`${ysyApi}/api/v1/member/findMember?userId=${userId}`)
            .then(res=>{
                if(res.data.code===0){
                    const data = res.data.data;
                    let family = data.map(item=>{
                        return {
                            label:`${item.lable}（${item.nickName}）`,
                            value:`${item.nickName}+${item.userId}`
                        }
                    });
                    this.setState({family:family});

                }
            })
    };
    submitReg=()=>{
        let regCode = this.state.devCode;
        let deviceName = this.state.devName[0];
        let authCode = this.state.authCode;
        if(regCode===""||deviceName===""||authCode===""){
            Toast.info('请完整填写再提交');
            return;
        }
        // 处理nickName和userId
        let member = deviceName.split('+');
        let nickName = member[0];
        let openId = member[1];

        // let openId = localStorage.getOpenId();
        let paramStr = `?regCode=${regCode}&deviceName=${nickName}&manCode=${authCode}&openId=${openId}`

        /*const query = 'regCode=439019875297094' +
                      '&openId=83fedff0-4d54-4a02-a0a4-787c7d1b9df3' +
                      '&deviceName=sophia' +
                      '&manCode=77795474';*/

        // 注册设备
        axios.get('/api/userReg'+paramStr,).then(res=>{
                const result = res.data.success;
                if(result){
                    Toast.info(res.data.msg,1);
                    setTimeout(()=>{
                        this.context.router.history.push('/')
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
                        placeholder="请输入设备码"
                         value={this.state.devCode}
                        onBlur={(value)=>this.checkReg(value)}
                        onChange={(value)=>this.onChange(value,'devCode')}
                    />
                    <div className="scan-btn">
                        <img src={require('./scan.png')} alt=""/>
                        <span>扫描二维码</span>
                    </div>
                </div>
                <Picker cols="1" title="家庭成员" data={this.state.family} extra="请选择家庭成员"
                        value={this.state.devName}
                        onOk={v => this.setState({ devName: v })}
                >
                    <List.Item className="pickerReg" arrow="horizontal">家庭成员</List.Item>
                </Picker>
                <InputItem
                    type="text"
                    placeholder="管理码"
                    value={this.state.authCode}
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
/*

<InputItem
    type="text"
    placeholder="请输入设备名称"
    value={this.state.devName}
    onChange={(value)=>this.onChange(value,'devName')}
/>*/
