import React from 'react';
import {List,Button,WhiteSpace,WingBlank,Picker ,InputItem,Toast} from 'antd-mobile';

import './house.scss'
const Item = List.Item;

class Test extends React.Component {
    constructor(){
        super();
        this.state={
            village:{
                label:'',
                value:''
            },
            house:{
                label:'',
                value:''
            },
            tel:''
        }
    }
    validate = ()=>{
        let village = this.state.village;
        let house = this.state.house;
        let tel = this.state.tel.replace(/\ /g,'');
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if(village[0]&&house[0]&&telReg.test(tel)){
            //输入有效
            console.log(this.props)
            this.props.history.goBack()
        }else{
            if(!telReg.test(tel)){
                Toast.info('请正确填写手机号码',2);
                return false;
            }else{
                Toast.info('请完整填写小区及房号',2);
            }

        }
    };
    render() {
        const village =  [
            {
                label:'力宝大厦',
                value:'力宝大厦'
            },{
                label:'南城都汇4期',
                value:'南城都汇4期'
            }
        ];
        const houseNum = [
            {
                label:'2栋四单元 903',
                value:'2栋四单元 903'
            },{
                label:'2栋四单元 901',
                value:'2栋四单元 901'
            }
        ]
        return (
            <div className="bind-wrapper">
                <div className="tips not-bind">绑定房屋后当您发生异常时，物业会及时获取信息并上门服务。</div>
               <div className="bind-form">
                   <List >
                       <Picker
                                title="请选择"
                               data={village}
                               cols={1}
                                value={this.state.village}
                               onOk={e => this.setState({"village":e})}
                       >
                        <Item arrow="horizontal">所在小区</Item>
                       </Picker>
                   </List>
                   <List>
                       <Picker
                           title="请选择"
                           disabled={this.state.village.value!==''?false:true}
                           data={houseNum}
                           cols={1}
                           value={this.state.house}
                           onOk={e => this.setState({"house":e})}
                       >
                           <Item arrow="horizontal">房屋编号</Item>
                       </Picker>
                   </List>
                   <List >
                        <InputItem
                            placeholder="请输入业主手机号码进行验证"
                            type="phone"
                            onChange={e=>this.setState({tel:e})}
                        >
                            手机号码
                        </InputItem>
                   </List>
               </div>
                <WingBlank>
                    <Button type="primary" onClick={this.validate}>绑定</Button>
                    <WhiteSpace />
                </WingBlank>


            </div>)
    }
}

export default Test;