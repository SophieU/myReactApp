import React from 'react';
import axios from '../../api';
import localStorage from '../../util/storage';
import {List,Button,WhiteSpace,WingBlank ,Toast} from 'antd-mobile';
import {Link} from 'react-router-dom';
const Item = List.Item;
const Brief = Item.Brief;

const ysyApi = localStorage.getYsyApi();
class Lists extends React.Component {
    constructor(){
        super();
        this.state={
            houseList:[]
        }

    }
    componentWillMount(){
        this.getHouseLists();
    }
    getHouseLists=()=>{
        let userId =  localStorage.getOpenId();
        Toast.loading('加载已有房屋中')
        axios.get(`${ysyApi}/api/v1/family/house/bind/list?userId=${userId}`)
            .then(res=>{
                if(res.data.code===0){
                    let data = res.data.data;
                    console.log(data)
                    data = data.map(item=>{
                        let nameTotal = item.detailedAddress;
                        let village = nameTotal.substr(0,nameTotal.indexOf(' '));
                        let house = nameTotal.substr(nameTotal.indexOf(' ')+1);

                        return {
                            village:village,
                            house:house,
                            id:item.id,
                            biotopeId:item.biotopeId,
                            isDefault:item.isDefault,
                            isOldMan:item.isOldMan

                        }
                    });
                    this.setState({
                        houseList:data
                    })
                    Toast.hide();
                }else{
                    Toast.info(res.data.msg, 1);
                    Toast.hide();
                }
            })
    }
    //设为老人房
    setHouse=(id)=>{
        let familyHouseId=id;
        let userId=localStorage.getOpenId();
        let equipmentId=localStorage.getEquipmentId();
        axios.get(`${ysyApi}/api/v1/family/house/bind/setting?userId=${userId}&familyHouseId=${familyHouseId}&equipmentId=${equipmentId}`)
            .then(res=>{
                if(res.data.code===0){
                    Toast.info('房屋绑定成功',1);
                    let newData = this.state.houseList.map(house=>{
                        if(house.id===familyHouseId){
                            house.isOldMan='Y'
                        }else{
                            house.isOldMan='N'
                        }
                        return house;
                    });

                    console.log(this.props)
                    this.setState({
                        houseList:newData
                    },function(){
                        this.props.history.replace('/')
                    })
                }else{
                    Toast.info(res.data.msg,1);
                }
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
                                <Item multipleLine extra={<button className="radio-btn" onClick={()=>this.setHouse(item.id)} style={item.isOldMan==='Y'?checked:{}}>设为老人房</button>}>
                                    {item.village}
                                    <Brief>{item.house}</Brief>
                                </Item>
                            </List>
                        ))
                    }
                </div>
                <WingBlank>
                <Link className="add-btn" to={`${match.url}/bind`}>添加房屋</Link>
                </WingBlank>

            </div>)
    }
}

export default Lists;