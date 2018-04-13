import React from 'react';
import {Link} from 'react-router-dom'
import './index.scss';
import IconLists from './icon-lists';
import LocationIndex from './index-location'
import DevStatu from './dev-status';

const WatchLink=()=>{
    return(
        <div className="watch-link">
            <Link to="/walk" className="link-item">
                <img src={require('../../images/pic-walk.png')}/>
                <div className="link-data">
                    <p><strong>2338</strong>步</p>
                    <p>计步</p>
                </div>
            </Link>
            <Link to="/heartbeat" className="link-item">
                <img src={require('../../images/pic-heartbeat.png')}/>
                <div className="link-data">
                    <p><strong>50</strong></p>
                    <p>心率</p>
                </div>
            </Link>
            <Link to="/blood" className="link-item">
                <img src={require('../../images/pic-blood.png')}/>
                <div className="link-data">
                    <p><strong>90/60</strong>mmHg</p>
                    <p>血压</p>
                </div>
            </Link>
            <Link to="/sleep" className="link-item">
                <img src={require('../../images/pic-sleep.png')}/>
                <div className="link-data">
                    <p><strong>2</strong>次</p>
                    <p>睡眠翻身次数</p>
                </div>
            </Link>
        </div>
    )
}
class Index extends React.Component{
    render(){
        return(
            <div>
                <DevStatu />
                <div className="control-panel">
                    <IconLists />
                    <LocationIndex />
                    <WatchLink />
                </div>
            </div>
        )
    }
}
export default Index;