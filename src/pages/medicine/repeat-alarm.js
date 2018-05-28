import React from 'react';
import {List,Checkbox,Button,WhiteSpace,WingBlank ,Toast} from 'antd-mobile';
import {CSSTransition} from 'react-transition-group';
import localStorage from '../../util/storage';

const CheckboxItem = Checkbox.CheckboxItem;


class Repeat extends React.Component {
    constructor(){
        super();
        this.state={
            show:false,
            once:{
                value:'1',
                label:'一次',
                checked:false
            },
            everyday:{
                value:'2',
                label:'每天',
                checked:false
            },
            weeksData:[
                {value:0,label:'周日',checked:false},
                {value:1,label:'周一',checked:false},
                {value:2,label:'周二',checked:false},
                {value:3,label:'周三',checked:false},
                {value:4,label:'周四',checked:false},
                {value:5,label:'周五',checked:false},
                {value:6,label:'周六',checked:false},
            ]
        }
    }
    componentDidMount(){
        // 左滑进入特效
        this.setState({
            show:true
        });
    }
    onChange=(Obj,index)=>{
        Obj.checked=!Obj.checked;
        if(Obj.label==="一次"){
            if(Obj.checked){
                this.setState({
                    weeksData:[
                        {value:0,label:'周日',checked:false},
                        {value:1,label:'周一',checked:false},
                        {value:2,label:'周二',checked:false},
                        {value:3,label:'周三',checked:false},
                        {value:4,label:'周四',checked:false},
                        {value:5,label:'周五',checked:false},
                        {value:6,label:'周六',checked:false},
                    ],
                    everyday:{
                        value:'2',
                        label:'每天',
                        checked:false
                    },
                })
            }
        }else if(Obj.label==="每天"){
            if(Obj.checked){
              this.setState({
                  weeksData:[
                      {value:0,label:'周日',checked:true},
                      {value:1,label:'周一',checked:true},
                      {value:2,label:'周二',checked:true},
                      {value:3,label:'周三',checked:true},
                      {value:4,label:'周四',checked:true},
                      {value:5,label:'周五',checked:true},
                      {value:6,label:'周六',checked:true},
                  ],
                  once:{
                      value:'1',
                      label:'一次',
                      checked:false
                  },
              })
            }
        }else{
            let weeksData =this.state.weeksData;
            weeksData.splice(index,1,Obj);
            this.setState({
                weeksData:weeksData,
                once:{
                    value:'1',
                    label:'一次',
                    checked:false
                },
                everyday:{
                    value:'2',
                    label:'每天',
                    checked:false
                },
            })
        }



    };
    save=()=>{
        let repeats = [];
        if(this.state.once.checked){
            repeats.push('一次')
        }else if(this.state.everyday.checked){
            repeats.push('每天')
        }else{
            this.state.weeksData.forEach((item)=>{
                if(item.checked){
                    repeats.push(item.label);
                }
            });
            if(repeats.length===0){
                Toast.info('请选择重复日期',1);
                return false;
            }
        }
        localStorage.setRepeatAlarm(repeats);
        this.props.history.goBack();


    };
    render() {
        return (
            <CSSTransition in={this.state.show} timeout={300} classNames="transition">
                <div className="repeat-alarm" >
                    <List>
                        <CheckboxItem
                            key={this.state.once.value}
                            onChange = {()=>this.onChange(this.state.once)}
                            checked={this.state.once.checked}
                        >
                            <span className="form-label">{this.state.once.label}</span>
                        </CheckboxItem>
                        <CheckboxItem
                            key={this.state.everyday.value}
                            onChange = {()=>this.onChange(this.state.everyday)}
                            checked={this.state.everyday.checked}
                        >
                            <span className="form-label">{this.state.everyday.label}</span>
                        </CheckboxItem>
                        {this.state.weeksData.map((item,index)=>(
                            <CheckboxItem
                                key={item.value}
                                onChange = {()=>this.onChange(item,index)}
                                checked={item.checked}
                            >
                                <span className="form-label">{item.label}</span>
                            </CheckboxItem>
                        ))}

                    </List>
                    <WingBlank>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.save}>保存</Button>
                        <WhiteSpace/>
                    </WingBlank>
                </div>
            </CSSTransition>

            )
    }
}

export default Repeat;