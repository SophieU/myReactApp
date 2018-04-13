import React from 'react';
import {List,Checkbox } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class Test extends React.Component {
    onChange(val){
        console.log(val)
    }
    render() {
        const weeksData=[
            {value:0,label:'周日'},
            {value:1,label:'周一'},
            {value:2,label:'周二'},
            {value:3,label:'周三'},
            {value:4,label:'周四'},
            {value:5,label:'周五'},
            {value:6,label:'周六'},
        ]
        return (
            <div>
                <List>
                    {weeksData.map(item=>(
                        <CheckboxItem
                            key={item.value}
                            onChange = {()=>this.onChange(item.value)}
                            style={{color:'4a4a4a'}}
                        >
                            <span className="form-label">{item.label}</span>
                        </CheckboxItem>
                    ))}
                </List>
            </div>)
    }
}

export default Test;