import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';
import DateRange from '../../components/date-range/date-range-picker'
import {List,Switch,Modal,Toast} from 'antd-mobile';
import axios from '../../api';
import moment from 'moment';
import localStorage from '../../util/storage';
import {createForm} from 'rc-form';

class Walk extends React.Component {
    constructor(){
        super();
        this.state={
            modal:false,
            timeLists:[],
            timeToday:'',
            steps:0,
            pedo:'0', //计步开关 0关 1开
            modalIndex:0, // 激活modal的时间段索引
            initialTime:"00:00-00:00",  //datePicker初始值
            dataBallTime:"",
        }
    }
    componentDidMount(){
        this.openId = localStorage.getOpenId();
        this.equipmentId = localStorage.getEquipmentId();
        this.getStepConfig();

        let time = moment(new Date()).format("YYYY-MM-DD");
        axios.get(`/api/step/getOneByTime?openId=${this.openId}&equipmentId=${this.equipmentId}&time=${time}`)
            .then(res=>{
                this.setState({
                    timeToday:time
                })
                console.log(res.data)
            })
    }
    timeSelected = (time)=>{
        let index = this.state.modalIndex;
        let timeLists = this.state.timeLists;
        timeLists[index]=time.startTime+'-'+time.endTime;

        this.setState({
            timeLists:timeLists
        });
        this.closeModal('modal')
    };
    closeModal=()=>{
        this.setState({
            modal:false
        })
    };
    showModal=(key,target,value)=>(e)=>{
        e.preventDefault(); //修复 Android 上点击穿透
        this.setState({
            [key]:true,
            modalIndex:target,
            initialTime:value
        })
    };
    /*get the step config from api*/
    getStepConfig=()=>{
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/step/getStepConfig?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    let data = res.data.walkTime;
                    let timeRangeLists = data.split(',');
                    this.setState({
                        timeLists:timeRangeLists,
                        pedo:res.data.pedo
                    });
                }
            })
    };
    switchPedo=(checked)=>{
      let pedo = checked?'1':'0';
        axios.get(`/api/step/setUpPedo?openId=${this.openId}&equipmentId=${this.equipmentId}&pedo=${pedo}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('成功打开计步功能',1)
                }else{
                    this.setState({
                        pedo:'0'
                    },()=>{
                        console.log(this.state.pedo)
                    });
                    Toast.info(res.data.msg,1)
                }
            })
    };
    setBallData=(value,time)=>{
        let date = (new Date().getMonth()+1)+'月'+time+'日';
        this.setState({
            steps:value,
            dataBallTime:date
        })
    };
    render() {
        const Item = List.Item;
        const {getFieldProps} = this.props.form;

        return (
            <div className="walk">
                <HealthHeader now="计步"/>
                <DataBall now="计步" value={this.state.steps} time={this.state.dataBallTime}/>
                <div className="recode-time">
                    <List>
                        <Item extra={<Switch
                            {...getFieldProps('openRecord',{initialValue:this.state.pedo==='1',valuePropName:'checked'})}
                            onChange={(checked)=>this.switchPedo(checked)}/>
                        }>计步</Item>
                        {
                            this.state.timeLists.map((timeRange,index)=>{
                                return (
                                    <Item key={index} arrow="horizontal"  extra={<div onClick={this.showModal('modal',index,timeRange)}>{timeRange}</div>
                                    }>记录时间段{index+1}</Item>
                                )
                            })
                        }
                        <Modal
                            popup
                            visible={this.state.modal}
                            animationType="slide-up"
                        >
                            <DateRange initialValue={this.state.initialTime} sureTime={(time)=>this.timeSelected(time)} cancle={this.closeModal}/>
                        </Modal>
                    </List>
                </div>
                <div>
                    <Charts type="bar" setBall={this.setBallData} />
                </div>
            </div>)
    }
}

const WalkFinal = createForm()(Walk);
export default WalkFinal;