import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import {List,Modal} from 'antd-mobile';
import Charts from './charts';
import DateRangePicker from '../../components/date-range/date-range-picker'
import axios from '../../api';
import localStorage from '../../util/storage';
import './health.scss';

class Sleep extends React.Component {
    constructor(){
        super();
        this.state={
            modal:false,
            timeRange:'',
        }
    }
    componentDidMount(){
        this.openId = localStorage.getOpenId();
        this.equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/sleeptime/getSleeptimeConfig?openId=${this.openId}&equipmentId=${this.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    let sleeptime = res.data.sleeptime;
                    this.setState({
                        timeRange:sleeptime
                    })
                }
            })
    }
    showModal=key=>(e)=>{
        e.preventDefault(); //修复 Android 上点击穿透
        this.setState({
            [key]:true
        })
    }
    closeModal=key=>()=>{
        this.setState({
            [key]:false
        })
    }
    timeSelected=(time)=>{
        this.setState({
            timeRange:time.startTime+'-'+time.endTime,
            modal:false
        })
    }
    render() {
        return (
            <div className="sleep">
                <HealthHeader now="睡眠"/>
                <DataBall now="睡眠"/>
                <List className="sleep-date">
                    <List.Item arrow="horizontal" extra={this.state.timeRange===''?'请选择':this.state.timeRange} onClick={this.showModal('modal')}>记录时间段</List.Item>
                    <Modal
                        popup
                        visible={this.state.modal}
                        onClose={this.closeModal('modal')}
                        animationType="slide-up"
                    >
                        <DateRangePicker initialValue={this.state.timeRange} sureTime={this.timeSelected} />
                    </Modal>
                </List>
                <div className="sleep-charts">
                    <Charts  type="bar"/>
                </div>
            </div>)
    }
}

export default Sleep;