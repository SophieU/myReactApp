import React from 'react';
import {Link} from 'react-router-dom';
import {NavBar,Icon,Popover} from 'antd-mobile';
import './header.scss';


const LeftIcon = ()=>{
    switch(window.location.pathname){
        case '/':
            return <div  key="0" className="flexbox"><Icon size="lg" type="left"/><span className="text-black">返回</span></div>;
        default:
            return <div  key="0" className='flexbox'><Icon type="left"/><span className="text-black">返回</span></div>;
    }
}
const RightIcon = ()=>{
    switch(window.location.pathname){
        case '/device-admin':
            return <Link key="0" to='/register-dev'>添加设备</Link>;
        case '/index':
            return <Link key="1" to='/device-admin'>设备管理</Link>;
        case '/location':
            return <span key="2">刷新</span>;
        case '/medicine':
            return <Link key="3" to='/add-medicine'>添加</Link>;
        case '/add-medicine':
            return <span key="4">保存</span>;
        case '/edit-medicine':
            return <span key="4">保存</span>;
        case '/repeat-alarm':
            return <span key="5">保存</span>;
        case '/mail-book':
            return <Link key="6" to='/add-mail'>添加</Link>;
        case '/add-mail':
            return <span key="7">保存</span>;
        default:
            return null;
    }
}


class Header extends React.Component {
    constructor(){
        super();
        this.state={
            nowRoute:'choose-dev',
            popVisible:false,
            selectedFamily:'碗豆'
        }
        this.changeFamily=this.changeFamily.bind(this);
    }
    changeFamily(opt){
        this.setState({
            popVisible:false,
            selectedFamily:opt.props.value,
        })
    }
    onLeftClick(e){
        window.history.back()
    }
    render() {
        return (

            <div className="header-bar">
                <NavBar
                    mode="light"
                    onLeftClick={this.onLeftClick}
                    leftContent={[LeftIcon()]}
                    rightContent={[
                        RightIcon(),
                    ]}
                >
                    <span>标题</span>
                </NavBar>
            </div>)
    }
}

export default Header;