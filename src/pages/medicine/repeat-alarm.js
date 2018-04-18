import React from 'react';
import {List,Checkbox,Button,WhiteSpace,WingBlank } from 'antd-mobile';
import * as _ from 'lodash';

const CheckboxItem = Checkbox.CheckboxItem;


class Test extends React.Component {
    constructor(){
        super();
        this.state={
            repeat:[]
        }
    }
    onChange(val){
        let repeatArr = this.state.repeat;
        console.log(repeatArr)
        console.log(_.includes({ 'a': 1, 'b': 2 }, 1))
        console.log(_.includes([{'a':1}],1))
        if(repeatArr.length<1){
            repeatArr.push(val)
        }else{

        }
        this.setState({
            repeat:repeatArr
        })
    }
    save=()=>{

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
                            onChange = {()=>this.onChange(item)}
                            style={{color:'4a4a4a'}}
                        >
                            <span className="form-label">{item.label}</span>
                        </CheckboxItem>
                    ))}

                </List>
                <WingBlank>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.save}>保存</Button>
                    <WhiteSpace/>
                </WingBlank>
            </div>)
    }
}

export default Test;