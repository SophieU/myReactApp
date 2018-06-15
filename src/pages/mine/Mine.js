import React from 'react';
import ReactDOM from 'react-dom';
import localStorage from '../../util/storage';

class Mine extends React.Component {
    constructor(){
        super()

        this.openId = localStorage.getOpenId();
        this.equipmentId=localStorage.getEquipmentId();

    }

    render() {
        let url = `http://jk.anxinqiao.com/share/config/home?openId=${this.openId}&equipmentId=${this.equipmentId}`;
        return (
            <div id="mine" ref="mineWrapper">
                <iframe  ref="mine"  src={url} frameBorder="0"></iframe>
            </div>
            )
    }
}

export default Mine;