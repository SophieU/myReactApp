import React from 'react';
import {List,Switch,Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Link} from 'react-router-dom';
import localStorage from "../../util/storage";
import {decodeAlert} from '../../model/medicine';
import axios from '../../api';

import './medicine.scss';


const Item = List.Item;
class BasicAlarm extends React.Component {
    constructor(){
        super();
        this.state={
            isOpen:false,
            alarmLists:[],
        }
    }
    componentDidMount(){
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        axios.get(`/api/medicine/getMedicine?openId=${openId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    let medicine = res.data.medicine;
                    let alarmLists = decodeAlert(medicine);
                    this.setState({
                        alarmLists
                    })
                }
            },err=>{
                Toast.info('加载失败',1);
                console.log(err)
            })
    }
    render() {
        const alarms = [
            {time:"08:00",repeat:'一天',isOpen:false,id:0},
            {time:"08:00",repeat:'每天',isOpen:true,id:1},
            {time:"08:00",repeat:'自定义',isOpen:false,id:2},
        ];
        const {getFieldProps} = this.props.form;

        return (
            <div>
                {
                    this.state.alarmLists.map((item,index)=>{
                        return(
                            <List  key={index}>
                                <Item
                                    extra={
                                        <Switch {...getFieldProps(index+'',{initialValue:item.checked,valuePropName:'checked'})}
                                        onClick={(checked)=>console.log(checked)}
                                    />}
                                >
                                    <Link  to={'/edit-medicine/'+item.id}>
                                        <h3>{item.time}</h3>
                                        <p className="alarm-repeat">{
                                            item.sequence.map(item=>{
                                                if(item.length===1){
                                                    return item;
                                                }else{
                                                    return item+' '
                                                }
                                            })
                                        }</p>
                                    </Link>

                                </Item>
                            </List>

                        )
                    })
                }

            </div>)
    }
}
const Alarm = createForm()(BasicAlarm)

export default Alarm;