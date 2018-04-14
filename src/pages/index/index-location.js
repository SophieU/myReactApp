import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd-mobile'
const AMap = window.AMap;


class LocationIndex extends React.Component {
    constructor(){
        super();
        this.state={
            nowAddress:''
        }
    }
    componentDidMount(){
        const lnglatXY=[104.076395,30.623233];
        const _this = this;
        var map = new AMap.Map('index-local',{
            zoom:12,
            center: lnglatXY,
        })

        // 在新中心点添加 marker
        var marker = new AMap.Marker({
            map: map,
            position: lnglatXY,
        });
        AMap.service('AMap.Geocoder',function(){
            const geocoder = new AMap.Geocoder({
                city:"028"
            })
            geocoder.getAddress(lnglatXY,function(status,result){
                if(status==='complete'&&result.info==='OK'){
                    // let address = result.regeocode.formattedAddress;
                    // let cat = address.indexOf('省');
                    // if(cat!==-1){
                    //     address = address.substring(cat+1)
                    // }
                    let addressCom = result.regeocode.addressComponent;
                    let address = addressCom.city+addressCom.district+addressCom.township+addressCom.street+addressCom.streetNumber+addressCom.building
                    console.log(result)
                    _this.setState({
                        nowAddress:address
                    })
                }else{
                    console.log('定位失败')
                }
            })
        })

    }
    render() {
        return (
            <Link className="index-local" to='/location'>
                <div id="index-local"></div>
                <div className="local-text"><img className="am-icon am-icon-xs" src={require('../../images/location.svg')}/>{this.state.nowAddress}</div>
            </Link>)

    }
}

export default LocationIndex;