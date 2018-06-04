import React from 'react';
import {Link} from 'react-router-dom';
import {Toast} from 'antd-mobile';
import localStorage from '../../util/storage'
const AMap = window.AMap;

class LocationIndex extends React.Component {
    constructor(){
        super();
        this.state={
            nowAddress:'',
            lnglat:[]
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.latitude===undefined||nextProps.longitude===undefined) return false;
        return true;
    }
    componentDidUpdate(prop){
        const lnglat=[prop.longitude,prop.latitude];
        if(lnglat[0]!==undefined&&lnglat[1]!==undefined&&this.state.nowAddress===''){
            this.geolocation(lnglat);
            return;
        }else if(lnglat[0]!==this.state.lnglat[0]&&lnglat[1]!==this.state.lnglat[1]){

            this.geolocation(lnglat);
            return;
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

                    let addressCom = result.regeocode.addressComponent;
                    let address = addressCom.city+addressCom.district+addressCom.township+addressCom.street+addressCom.streetNumber+addressCom.building
                    _this.setState({
                        nowAddress:address,
                        lnglat:lnglatXY
                    })
                }else{
                    Toast.info('定位失败',1)
                }
            })
        })
    }


    render() {
        return (
            <Link className="index-local" to='/location'>
                <div id="index-local"></div>
                <div className="local-text"><img alt="" className="am-icon am-icon-xs" src={require('../../images/address.png')}/>{this.state.nowAddress}</div>
            </Link>)

    }
}

export default LocationIndex;