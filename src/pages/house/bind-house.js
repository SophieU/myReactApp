import React from 'react';
import {List,Button,WhiteSpace,WingBlank,Picker ,InputItem} from 'antd-mobile';

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
            }
        }
    }
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
                               onDismiss={e => console.log('dismiss', e)}
                       >
                        <Item arrow="horizontal">所在小区</Item>
                       </Picker>
                   </List>
                   <List>
                       <Picker
                           title="请选择"
                           disabled
                           data={houseNum}
                           cols={1}
                           value={this.state.village}
                           onOk={e => this.setState({"village":e})}
                           onDismiss={e => console.log('dismiss', e)}
                       >
                           <Item arrow="horizontal">房屋编号</Item>
                       </Picker>
                   </List>
                   <List >
                        <InputItem
                            placeholder="请输入业主手机号码进行验证"
                            // onChange={e=>console.log(e)}
                        >
                            手机号码
                        </InputItem>
                   </List>
               </div>
                <WingBlank>
                    <Button type="primary" disabled>绑定</Button>
                    <WhiteSpace />
                </WingBlank>


            </div>)
    }
}

export default Test;