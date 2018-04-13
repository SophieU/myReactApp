import React from 'react';
import {Link} from 'react-router-dom';
import './health.scss';
// import {Tabs,WhiteSpace} from 'antd-mobile';


class Health extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const tabs = [
            {title:"计步",url:'/walk'},
            {title:"心率",url:'/heartbeat'},
            {title:"血压",url:'/blood'},
            {title:"睡眠",url:'/sleep'},
        ];
        return (
            <div >
                <ul className="health-tab-bar">
                    {
                        tabs.map(item=>(<li key={item.url} className={this.props.now==item.title?'tab-item active':'tab-item'}><Link to={item.url}>{item.title}</Link></li>))
                    }
                </ul>
            </div>)
    }
}

export default Health;