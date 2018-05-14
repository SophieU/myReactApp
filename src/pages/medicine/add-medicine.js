import React from 'react';
import {createForm} from 'rc-form';
import{ List,Switch,DatePickerView,Icon,Button,WhiteSpace,WingBlank} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Repeat from './repeat-alarm';
import {Route} from 'react-router-dom';
import localStorage from '../../util/storage';



const Item = List.Item;
class BasicAddMed extends React.Component {
    constructor(){
        super();
        this.state={
            time:new Date(),
            showRepeat:false,
            repeatDate:[],
            repeat:false
        }
    }
    componentDidMount(){
        let match=this.props.match;
        if(match.url==="/add-medicine"){
            console.log('添加')
        }else{
            console.log('编辑')
        }
    }
    /*从重复设置跳转回时*/
    componentDidUpdate(prePro){

        let from = prePro.location.pathname;
        let index = from.lastIndexOf('/');
        let fromRoute = from.substr(index);
        if(fromRoute==='/repeat'){
            this.setState({
                repeatDate:localStorage.getRepeatAlarm(),
                repeat:true,
            });

        }


    }
    onChange(obj){
        // console.log(obj)
    }
    repeatHandler=(checked)=>{
        if(!checked){
            this.setState({
                repeatDate:[]
            });
            localStorage.removeRepeatAlarm();
        }
      this.setState({
          repeat:checked
      })
    };
    goRepeat=()=>{
        console.log(this.state.repeat)
        if(this.state.repeat){
            this.props.history.push(`${this.props.match.url+'/repeat'}`);
        }else{
            return false;
        }

    };
    saveAlarm=()=>{
        let time = this.state.time;
        let repeats = [];
        if(this.state.repeat){
            repeats=this.state.repeatDate;
        }
        this.props.history.push('/medicine')
    };
    render() {
        let match = this.props.match;
        const {getFieldProps} =  this.props.form;
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
                        <Switch {...getFieldProps('repeat',{initialValue:this.state.repeat,valuePropName:'checked'})}
                            onClick={this.repeatHandler}
                        />
                    }>
                        <span className="form-label">重复</span>
                     </Item>
                    <Item onClick={this.goRepeat} extra={
                         <div className="repeat-day">
                             <span style={this.state.repeat?{display:"none"}:{display:""}}>不重复</span>
                             {
                                 this.state.repeatDate.map((date,index)=>(<span key={index}>{date}</span>))
                             }
                             <Icon className="icon" type="right"/>
                         </div>
                    }>
                         <span className="form-label">重复设置</span>
                    </Item>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.saveAlarm}>保存</Button>
                    <WhiteSpace />
                </WingBlank>
                <Route  path={`${match.url+'/repeat'}`} component={Repeat}/>
            </div>)
    }

}

const AddMedicine = createForm()(BasicAddMed);
export default AddMedicine;