import React from 'react';
import {createForm} from 'rc-form';
import{ Toast,List,Switch,DatePickerView,Icon,Button,WhiteSpace,WingBlank} from 'antd-mobile';
import Repeat from './repeat-alarm';
import {Route} from 'react-router-dom';
import localStorage from '../../util/storage';
import {encodeAlert} from "../../model/medicine";
import axios from '../../api'


const Item = List.Item;
class BasicAddMed extends React.Component {
    constructor(){
        super();
        this.state={
            time:new Date(),
            showRepeat:false,
            repeatDate:[],
            repeat:false
        }
    }
    componentDidMount(){
        let match=this.props.match;
        if(match.url==="/add-medicine"){
            console.log('添加')

        }else{
            let index = parseInt(this.props.match.params.id,10);
            let alarmLists = localStorage.getAlarmLists();
            let alarm = alarmLists[index]; // 00:00
            let dateTime = new Date().getFullYear() + '/'+(new Date().getMonth()+1)+'/'+new Date().getDate()

            this.setState({
                time:new Date(dateTime+' '+alarm.time+":00"),
                repeatDate:alarm.sequence,
                repeat:alarm.sequence[0]==="一次"?false:true,
            })
        }

    }
    /*从重复设置跳转回时*/
    componentDidUpdate(prePro){
        let from = prePro.location.pathname;
        let index = from.lastIndexOf('/');
        let fromRoute = from.substr(index);
        if(fromRoute==='/repeat'){
            if(localStorage.getRepeatAlarm().length!==0){
                this.setState({
                    repeatDate:localStorage.getRepeatAlarm(),
                },()=>{
                    this.setState({
                        repeat:this.state.repeatDate[0]==="一次"?false:true,
                    })
                });
            }
        }else{
            localStorage.removeRepeatAlarm();
        }
    }

    repeatHandler=(checked)=>{
        if(!checked){
            this.setState({
                repeatDate:[]
            });
            localStorage.removeRepeatAlarm();
        }
      this.setState({
          repeat:checked
      })
    };
    /*跳转至重复设置*/
    goRepeat=()=>{
        console.log(this.state.repeat)

        if(this.state.repeat){
            this.props.history.push(`${this.props.match.url+'/repeat'}`);
        }else{
            return false;
        }

    };
    formateTime=(time)=>{
        let h = time.getHours()<10? '0'+time.getHours():time.getHours();
        let mm = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
        return h+":"+mm;
    }
    /*保存*/
    saveAlarm=()=>{
        let time = this.state.time;
        let  repeats=this.state.repeatDate;
        if(repeats.length===0){
            Toast.info('请选择重复时间段',1);
            return false;
        }
        let index = parseInt(this.props.match.params.id,10)+1;
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        let timeStr = this.formateTime(time);
        let dateTime = encodeAlert(timeStr,true,repeats);
        let medicineAll = localStorage.getMedicine();
        medicineAll=medicineAll.split(',');
        medicineAll[index-1]=dateTime;
        medicineAll=medicineAll.join(',');
        axios.get(`/api/medicine/setup?openId=${openId}&equipmentId=${equipmentId}&remind=${medicineAll}&udcount=${index}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('设置成功',1)
                    setTimeout(()=>{
                        this.props.history.push('/medicine')
                    },1000)
                }else{
                    Toast.info(res.data.msg,1)
                }
            })
        // this.props.history.push('/medicine')
    };

    render() {
        let match = this.props.match;
        const {getFieldProps} =  this.props.form;

        return (
            <div className="medicine-inner">
                <div className="datetime-wrapper">
                    <DatePickerView
                        format="HH:mm"
                        mode={'time'}
                        value={this.state.time}
                        onChange={(time)=>this.setState({time})}
                    />
                </div>
                <List>
                    <Item extra={
                        <Switch {...getFieldProps('repeat',{initialValue:this.state.repeat,valuePropName:'checked'})}
                            onClick={this.repeatHandler}
                        />
                    }>
                        <span className="form-label">重复</span>
                     </Item>
                    <Item onClick={this.goRepeat} extra={
                         <div className="repeat-day">
                             {
                                 this.state.repeatDate.map((date,index)=>(<span key={index}>{date}</span>))
                             }
                             <Icon className="icon" type="right"/>
                         </div>
                    }>
                         <span className="form-label">重复设置</span>
                    </Item>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.saveAlarm}>保存</Button>
                    <WhiteSpace />
                </WingBlank>
                <Route  path={`${match.url+'/repeat'}`} component={Repeat}/>
            </div>)
    }

}

const AddMedicine = createForm()(BasicAddMed);
export default AddMedicine;