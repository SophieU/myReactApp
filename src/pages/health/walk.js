import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';
import DateRange from '../../components/date-range/date-range-picker'
import {List,Switch,Modal} from 'antd-mobile';
import axios from '../../api';
import localStorage from '../../util/storage';
import {createForm} from 'rc-form';

class Walk extends React.Component {
    constructor(){
        super();
        this.state={
            modal:false,
            timeLists:[],
            modalIndex:0, // 激活modal的时间段索引
            initialTime:"00:00-00:00",  //datePicker初始值
        }
    }
    componentDidMount(){
        this.getStepConfig();
    }
    timeSelected = (time)=>{
        let index = this.state.modalIndex;
        let timeLists = this.state.timeLists;
        timeLists[index]=time.startTime+'-'+time.endTime;
        console.log(index)
        console.log(timeLists)
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
                console.log(res.data)
                if(res.data.success){
                    let data = res.data.walkTime;
                    let timeRangeLists = data.split(',');
                    this.setState({
                        timeLists:timeRangeLists
                    });
                }
            })
    };
    render() {
        const Item = List.Item;
        const {getFieldProps} = this.props.form;

        return (
            <div className="walk">
                <HealthHeader now="计步"/>
                <DataBall now="计步"/>
                <div className="recode-time">
                    <List>
                        <Item extra={<Switch
                            {...getFieldProps('openRecord',{initialValue:true,valuePropName:'checked'})}
                            onClick={(checked)=>console.log(checked)}/>
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
                    <Charts type="bar" />
                </div>
            </div>)
    }
}

const WalkFinal = createForm()(Walk);
export default WalkFinal;