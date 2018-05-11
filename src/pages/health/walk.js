import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';
import DateRange from '../../components/date-range/date-range-picker'
import {List,Switch,Modal} from 'antd-mobile';
import {createForm} from 'rc-form';

class Walk extends React.Component {
    constructor(){
        super();
        this.state={
            modal1:false,
            timeRange1:'全天',
            timeRange2:'无',
            timeRange3:'无',
        }
    }
    timeSelected = (time)=>{
        let stateName = this.state.target;
        this.setState({
            [stateName]:time.startTime+'-'+time.endTime
        });
        this.closeModal('modal1')
    }
    closeModal=(key)=>{
        this.setState({
            [key]:false
        })
    }
    showModal=(key,target)=>(e)=>{
        e.preventDefault(); //修复 Android 上点击穿透
        this.setState({
            [key]:true,
            target:target
        })
    }
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
                        <Item arrow="horizontal"  extra={<div onClick={this.showModal('modal1','timeRange1')}>{this.state.timeRange1}</div>
                        }>记录时间段1</Item>

                        <Item arrow="horizontal" extra={
                          <div  onClick={this.showModal('modal1','timeRange2')}>{this.state.timeRange2}</div>
                        }>记录时间段2</Item>
                        <Item arrow="horizontal" extra={
                            <div  onClick={this.showModal('modal1','timeRange3')}>{this.state.timeRange3}</div>
                        }>记录时间段3</Item>
                        <Item arrow="horizontal" extra={
                            <div  onClick={this.showModal('modal1','timeRange3')}>{this.state.timeRange3}</div>
                        }>记录时间段3</Item>
                        <Item arrow="horizontal" extra={
                            <div  onClick={this.showModal('modal1','timeRange3')}>{this.state.timeRange3}</div>
                        }>记录时间段3</Item>
                        <Item arrow="horizontal" extra={
                            <div  onClick={this.showModal('modal1','timeRange3')}>{this.state.timeRange3}</div>
                        }>记录时间段3</Item>
                        <Modal
                            popup
                            visible={this.state.modal1}
                            animationType="slide-up"
                        >
                            <DateRange sureTime={(time)=>this.timeSelected(time)} cancle={this.closeModal}/>
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