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
        this.setState({
            show:true
        });
    }
    onChange=(Obj,index)=>{
        Obj.checked=!Obj.checked;
        let weeksData =this.state.weeksData;
        weeksData.splice(index,1,Obj);
       this.setState({
           weeksData:weeksData
       })
    };
    save=()=>{
        let repeats = [];
        this.state.weeksData.forEach((item)=>{
            if(item.checked){
                repeats.push(item.label);
            }
        });
        if(repeats.length===0){
            Toast.info('请选择重复日期');
            return false;
        }else{
            localStorage.setRepeatAlarm(repeats);
            this.props.history.goBack();
        }
    };
    render() {

        return (
            <CSSTransition in={this.state.show} timeout={300} classNames="transition">
                <div className="repeat-alarm" >
                    <List>
                        {this.state.weeksData.map((item,index)=>(
                            <CheckboxItem
                                key={item.value}
                                onChange = {()=>this.onChange(item,index)}
                                style={{color:'4a4a4a'}}
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