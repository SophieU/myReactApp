import React from 'react';
import axsio from '../../api';
import {List,Button,WhiteSpace,WingBlank } from 'antd-mobile';
import {Link} from 'react-router-dom';
const Item = List.Item;
const Brief = Item.Brief;

class Lists extends React.Component {
    constructor(){
        super();
        this.state={
            houseList:[]
        }

    }
    componentWillMount(){
        this.setState({
            houseList:[
                {
                    name:'力宝大厦',
                    house:'1栋-2单元501',
                    default:false
                },{
                    name:'力宝大厦',
                    house:'1栋-2单元503',
                    default:false
                }
            ]
        })
    }
    setHouse=(index)=>{

        let houseList = this.state.houseList;
        let value = !houseList[index].default;

        houseList.forEach((item,indexInner)=>{
            if(indexInner===index&&value){
                item.default=value
            }else{
                item.default=false
            }
        })
        // houseList[index].default=!houseList[index]

        this.setState({
            houseList:houseList
        })
    }
    render() {
        let lists = this.state.houseList;
        let checked = {background: '#3AA7FF', color: '#FFFFFF'};
        let match = this.props.match;
        return (
            <div className="lists-box">
                <div className="tips has-binded" >请选择老人居住的房屋并确定</div>
                <div className="lists-wrapper">
                    {
                        lists.map((item,index)=>(
                            <List key={index} className="my-list">
                                <Item multipleLine extra={<button className="radio-btn" onClick={()=>this.setHouse(index)} style={item.default?checked:{}}>设为老人房</button>}>
                                    {item.name}
                                    <Brief>{item.house}</Brief>
                                </Item>
                            </List>
                        ))
                    }
                </div>
                <Link className="add-btn" to={`${match.url}/bind`}>添加房屋</Link>
                <WingBlank>
                    <Button className="bind-btn" type="primary" disabled>绑定</Button>
                    <WhiteSpace />
                </WingBlank>

            </div>)
    }
}

export default Lists;