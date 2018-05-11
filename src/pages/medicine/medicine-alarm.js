import React from 'react';
import {List,Switch} from 'antd-mobile';
import {createForm} from 'rc-form';
import {Link} from 'react-router-dom';
import './medicine.scss';

const Item = List.Item;
class BasicAlarm extends React.Component {
    constructor(){
        super();
        this.state={
            isOpen:false
        }
    }
    componentDidMount(){

    }
    render() {
        const alarms = [
            {time:"08:00",repeat:'一天',isOpen:false,id:0},
            {time:"08:00",repeat:'每天',isOpen:true,id:1},
            {time:"08:00",repeat:'自定义',isOpen:false,id:2},
        ]
        const {getFieldProps} = this.props.form;
        return (
            <div>
                {
                    alarms.map((item,index)=>{
                        return(
                            <List  key={index}>
                                <Item
                                    extra={
                                        <Switch {...getFieldProps(index+'',{initialValue:item.isOpen,valuePropName:'checked'})}
                                        onClick={(checked)=>console.log(checked)}
                                    />}
                                >
                                    <Link  to={'/edit-medicine/'+item.id}>
                                        <h3>{item.time}</h3>
                                        <p className="alarm-repeat">{item.repeat}</p>
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