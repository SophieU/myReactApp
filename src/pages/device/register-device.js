import React from 'react';
import './device.scss';
import {createForm} from 'rc-form';
import {List,InputItem,Toast,Button} from 'antd-mobile';

const Item = List.Item;
class BasicRegister extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        const {getFiledProps}=this.props.form
        return(<div className="login-panel">
            <img className="login-bg" src={require('../../images/pic-register.png')} alt=""/>
            <List className="form-wrapper">
                <div className="flexbox">
                    <InputItem
                        type="text"
                        placeholder="请输入设备码"
                        // error={this.state.hasError}
                        // onErrorClick={this.onErrorClick}
                        // onChange={this.onChange}
                    />
                    <div className="scan-btn">
                        <img src={require('./scan.png')} alt=""/>
                        <span>扫描二维码</span>
                    </div>

                </div>
                <InputItem
                    type="text"
                    placeholder="请输入设备名称"
                    // error={this.state.hasError}
                    // onErrorClick={this.onErrorClick}
                    // onChange={this.onChange}
                />
                <InputItem
                    type="text"
                    placeholder="验证码"
                    // error={this.state.hasError}
                    // onErrorClick={this.onErrorClick}
                    // onChange={this.onChange}
                />
                <Button type="primary">注册设备</Button>
            </List>
            <p>添加设备表示您已同意并遵守安心桥服务条款</p>
        </div>)
    }
}
const Register = createForm()(BasicRegister);
export default Register;