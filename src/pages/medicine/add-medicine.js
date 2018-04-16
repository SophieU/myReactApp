import React from 'react';
import {createForm} from 'rc-form';
import{ List,Switch,DatePickerView,Icon,Button,WhiteSpace,WingBlank} from 'antd-mobile';
import {Link} from 'react-router-dom';

const Item = List.Item;
class BasicAddMed extends React.Component {
    constructor(){
        super();
        this.state={
            time:new Date(),
        }
    }
    onChange(obj){
        console.log(obj)
    }
    render() {
        const {getFieldProps,getFieldError} =  this.props.form;
        return (
            <div className="medicine-inner">
                <div className="datetime-wrapper">
                    <DatePickerView
                        user12Hours
                        mode={'time'}
                        value={this.state.time}
                        onChange={this.onChange}
                    />
                </div>
                <List>
                    <Item extra={
                        <Switch {...getFieldProps('repeat',{initialValue:true,valuePropName:'checked'})}
                            onClick={(checked)=>console.log(checked)}
                        />
                    }><span className="form-label">重复</span></Item>
                    <Link to='/repeat-alarm'>
                        <Item extra={
                        <Icon type="right"/>
                    }><span className="form-label">重复设置</span></Item>
                    </Link>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary">保存</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>)
    }

}

const AddMedicine = createForm()(BasicAddMed)
export default AddMedicine;