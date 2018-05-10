import React from 'react';
import {Link} from 'react-router-dom';
import {Toast} from 'antd-mobile'
const AMap = window.AMap;


class LocationIndex extends React.Component {
    constructor(){
        super();
        this.state={
            nowAddress:''
        }
    }
    geolocation(lnglatXY){
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
                    _this.setState({
                        nowAddress:address
                    })
                }else{
                    Toast.info('定位失败')
                }
            })
        })
    }
    componentWillUpdate(prop){
        const lnglat=[prop.longitude,prop.latitude];
        if(lnglat[0]!==undefined&&lnglat[1]!==undefined&&this.state.nowAddress===''){
            this.geolocation(lnglat);
            return;
        }else{
            return;
        }
    }

    render() {
        return (
            <Link className="index-local" to='/location'>
                <div id="index-local"></div>
                <div className="local-text"><img alt="" className="am-icon am-icon-xs" src={require('../../images/location.svg')}/>{this.state.nowAddress}</div>
            </Link>)

    }
}

export default LocationIndex;