import React from 'react';
import {DatePickerView,Button,Toast} from 'antd-mobile';
import '../../style/base.scss';
import moment from 'moment';
/*
* date-range组件：
* Params：
*   sureTime:function类型，必须，表示确定后的回调
*
*
* */

class DateRange extends React.Component {
    constructor(){
        super();
        this.state={
            timeStart:null,
            timeEnd:null
        }
    }
    componentDidMount(){
        let timeRange = this.props.initialValue;
        let timeStart = timeRange.substr(0,timeRange.indexOf('-'));
        let timeEnd = timeRange.substr(timeRange.indexOf('-')+1);

        this.setState({
            timeStart:timeStart,
            timeEnd:timeEnd
        })
    }
    timeStartChange = (time)=>{
        this.setState({
            timeStart:time,
            timeEnd:time
        })
    }
    timeEndChange= (time)=>{
        this.setState({
            timeEnd:time
        })

    }
    handleSubmit = ()=>{
        let {timeStart,timeEnd} = this.state;
       if(timeStart===null){
           Toast.info('请选择开始时间',1);
           return;
       }
        timeStart = moment(timeStart);
        timeEnd = moment(timeEnd);
        if(moment.max(timeStart,timeEnd)!=timeEnd){
            Toast.info('请选择正确的结束时间',1)
        }else{
           const dateRange = {
               startTime:timeStart.format("HH:mm"),
               endTime:timeEnd.format("HH:mm")
           }
           this.props.sureTime(dateRange);
           // this.props.cancle();
        }
    }
    close=()=>{
        console.log('cancle daterange')
        this.props.cancle()
    }
    render() {
        return (
            <div className="date-range-wrapper">
                <div className="date-range-header">
                    <Button inline size="small" onClick={this.close}>取消</Button>
                    <span className="title">请选择时间段</span>
                    <Button onClick={this.handleSubmit} type="ghost" inline size="small" >确定</Button>
                </div>
                <div className="date-range-picker">
                    <div className="picker-col">
                        <DatePickerView
                            mode="time"
                            value={this.state.timeStart}
                            onChange={this.timeStartChange}
                        />
                    </div>
                    <div className="center-line">至</div>
                    <div className="picker-col">
                        <DatePickerView
                            mode="time"
                            value={this.state.timeEnd}
                            onChange={this.timeEndChange}
                        />
                    </div>
                </div>
            </div>

            )
    }
}

export default DateRange;