import React from 'react';
import localStorage from '../../util/storage';

class Mine extends React.Component {
    constructor(){
        super()

        this.openId = localStorage.getOpenId();
        this.equipmentId=localStorage.getEquipmentId();

    }

    render() {
        let url = `http://jk.anxinqiao.com/share/config/home?openId=${this.openId}&equipmentId=${this.equipmentId}`;
        alert(url)
        return (
            <div id="mine" ref="mineWrapper">
                <iframe title="我的" ref="mine"  src={url} frameBorder="0"></iframe>
            </div>
            )
    }
}

export default Mine;