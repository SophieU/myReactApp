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
            modal1:false
        }
    }
    timeSelected = (time)=>{
        console.log(time)
    }
    closeModal=(key)=>()=>{
        this.setState({
            [key]:false
        })
    }
    showModal=key=>(e)=>{
        e.preventDefault(); //修复 Android 上点击穿透
        this.setState({
            [key]:true
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
                        <Item arrow="horizontal"  extra={<div onClick={this.showModal('modal1')}>全天</div>
                        }>记录时间段1</Item>
                        <Modal
                            popup
                            visible={this.state.modal1}
                            onClose={this.closeModal('modal1')}
                            animationType="slide-up"
                        >
                            <DateRange sureTime={this.timeSelected} />
                        </Modal>
                        <Item arrow="horizontal" extra={<div>无</div>

                        }>记录时间段2</Item>
                        <Item arrow="horizontal" extra={<div>无</div>

                        }>记录时间段3</Item>

                    </List>
                </div>
                <div>
                    <Charts />
                </div>
            </div>)
    }
}

const WalkFinal = createForm()(Walk);
export default WalkFinal;