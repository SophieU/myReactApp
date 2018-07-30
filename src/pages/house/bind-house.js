import React from 'react';
import {List,Button,WhiteSpace,WingBlank,Picker ,InputItem,Toast} from 'antd-mobile';
import localStorage from '../../util/storage';
import axios from '../../api';
import './house.scss'
const Item = List.Item;

const ysyUrl = localStorage.getYsyApi();
class Test extends React.Component {
    constructor(){
        super();
        this.state={
            villageLists:[],
            houseList:[],
            village:{
                label:'',
                value:''
            },
            house:{
                label:'',
                value:''
            },
            tel:'',
            villageId:'',
            pageNo:1,
            hasNextPage:true,
            nextPage:2,
        }
    }
    componentDidMount(){
        axios.get(`${ysyUrl}/api/v1/family/biotope/listWithCity`)
            .then(res=>{
                if(res.data.code===0){
                    let data = res.data.data;
                    let finalData=[];
                    finalData=data.map(item=>{
                        let temp={};
                        temp.label=item.cityName;
                        temp.value=item.cityName;
                        temp.children=item.biotopeList.map(itemInner=>{
                            let innerTemp = {};
                            innerTemp.label=itemInner.name;
                            innerTemp.value=itemInner.id;
                            return innerTemp;
                        })
                        return temp;
                    })
                    this.setState({
                        villageLists:finalData
                    })

                }else{
                    Toast.info(res.data.msg,1)
                }
            })
    }
    validate = ()=>{
        let village = this.state.village;
        let house = this.state.house;
        let tel = this.state.tel.replace(/\ /g,'');
        console.log(house)
        let telReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if(village[0]&&house[0]&&telReg.test(tel)){
            //输入有效
            console.log(this.props)
            let userId=localStorage.getOpenId();
            let familyHouseId=house[0];

            axios.get(`${ysyUrl}/api/v1/family/house/bindhouse?userId=${userId}&familyHouseId=${familyHouseId}&mobile=${tel}`)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.code===0){
                        Toast.info('绑定成功',1);
                        let _this = this;
                        console.log(this.props)
                        setTimeout(()=>{
                            _this.props.history.goBack();
                        },1000)
                    }else{
                        Toast.info(res.data.msg)
                    }
                })
            // this.props.history.goBack()
        }else{
            if(!telReg.test(tel)){
                Toast.info('请正确填写手机号码',1);
                return false;
            }else{
                Toast.info('请完整填写小区及房号',1);
            }

        }
    };
    sureVillage=(e)=>{
        if(e.length!==0){
            let villageId=e[1];
            this.setState({
                village:e,
                villageId:villageId,
                pageNo:1,
                hasNextPage:true,
                nextPage:2,
                houseList:[]
            },function(){
                this.getHouse(villageId)
            });

        }

    };
    getHouse=(id,val)=>{
        console.log(2)
        let villageId=id;
        let pageNo=this.state.pageNo;
        let pageTotal=this.state.pageTotal;
        console.log('pageTotal'+pageTotal);

        if(this.state.hasNextPage){
            axios.get(`${ysyUrl}/api/v1/family/house/listByFamilyBiotope?familyBiotopeId=${villageId}&pageNo=${pageNo}`)
                .then(res=>{
                    if(res.data.code===0){
                        let data = res.data.data.list;
                        let oldData=this.state.houseList;
                        let hasNextPage=res.data.data.hasNextPage;
                        data = data.map(item=>{
                            return {
                                label:item.detailedAddress,
                                value:item.id
                            };
                        });
                        let newData = oldData.concat(data);
                        this.setState({
                            pageTotal: res.data.data.totalPage,
                            houseList:newData,
                            pageNo:hasNextPage?res.data.data.nextPage:res.data.data.pageNo,
                            hasNextPage:hasNextPage,
                            house:val?val:this.state.house
                        })
                    }
                })
        }

    };
    houseChange=(val)=>{
        let villageId=this.state.villageId;
        this.getHouse(villageId,val)
    };
    render() {

        return (
            <div className="bind-wrapper">
                <div className="tips not-bind">绑定房屋后当您发生异常时，物业会及时获取信息并上门服务。</div>
               <div className="bind-form">
                   <List >
                       <Picker
                                title="请选择"
                               data={this.state.villageLists}
                               cols={2}
                                value={this.state.village}
                               onOk={this.sureVillage}
                       >
                        <Item arrow="horizontal">所在小区</Item>
                       </Picker>
                   </List>
                   <List>
                       <Picker
                           title="请选择"
                           disabled={this.state.village.value!==''?false:true}
                           data={this.state.houseList}
                           cols={1}
                           value={this.state.house}
                           onPickerChange={(val)=>{this.houseChange(val)}}
                           onOk={e => this.setState({"house":e})}
                       >
                           <Item arrow="horizontal">房屋编号</Item>
                       </Picker>
                   </List>
                   <List >
                        <InputItem
                            placeholder="请输入业主手机号码进行验证"
                            type="phone"
                            onChange={e=>this.setState({tel:e})}
                        >
                            手机号码
                        </InputItem>
                   </List>
               </div>
                <WingBlank>
                    <Button type="primary" onClick={this.validate}>绑定</Button>
                    <WhiteSpace />
                </WingBlank>


            </div>)
    }
}

export default Test;