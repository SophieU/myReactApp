import React from 'react';
import {Link} from 'react-router-dom';
import {NavBar,Icon} from 'antd-mobile';
import './header.scss';


class Header extends React.Component {
    constructor(){
        super();
        this.state={
            nowRoute:'choose-dev'
        }
    }
    render() {
        const nowRoute = this.state.nowRoute;
        const LeftIcon = ()=>{
            switch(window.location.pathname){
                case '/':
                    return <div className='flexbox'><Icon type="left"/>返回</div>;
                    break;
                case '/index':
                    return <div className='flexbox'><Link to='/usercenter'>我的</Link></div>;
                    break;
            }
            return null;
        }
        return (

            <div className="header-bar">
                <LeftIcon className='center'/>
                <span className="header-title">标题</span>
            </div>)
    }
}

export default Header;