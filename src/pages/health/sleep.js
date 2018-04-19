import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import {List,Modal} from 'antd-mobile';
import Charts from './charts';
import DateRangePicker from '../../components/date-range/date-range-picker'
import './health.scss';

class Sleep extends React.Component {
    constructor(){
        super();
        this.state={
            modal:false,
            timeRange:'',
        }
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
                        <DateRangePicker sureTime={this.timeSelected} />
                    </Modal>
                </List>
                <div className="sleep-charts">
                    <Charts  type="bar"/>
                </div>
            </div>)
    }
}

export default Sleep;