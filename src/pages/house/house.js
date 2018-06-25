import React from 'react';

import banner from '../../images/banner.png';
import './house.scss';
class House extends React.Component {
    render() {
        return (
            <div>
                <img className="banner" src={banner} alt="banner"/>
                <div className="tips not-bind">绑定房屋后当您发生异常时，物业会及时获取信息并上门服务。</div>
                <div className="tips has-binded" style={{display:false?"block":"none"}}>请选择老人居住的房屋并确定</div>
                <div className="house">

                </div>
            </div>)
    }
}

export default House;