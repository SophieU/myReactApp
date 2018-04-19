import React from 'react';
import {Link} from 'react-router-dom';
import {NavBar,Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './header.scss';

const refresh=()=>{
    window.location.reload()
}
const routes={
    '/choose-dev':{
        title:'选择设备'
    },
    '/':{
        title:'首页'
    },
    '/register':{
        title:'注册'
    },
    '/medicine':{
        title:'吃药提醒'
    },
    '/add-medicine':{
        title:'添加提醒'
    },
    '/edit-medicine':{
        title:'重复提醒'
    },
    '/repeat-alarm':{
        title:'重复设置'
    },
    '/device-admin':{
        title:'设备管理'
    },
    '/register-dev':{
        title:'注册设备'
    },
    '/location':{
        title:'定位'
    },
    '/add-mail':{
        title:'添加号码'
    },
    '/mail-book':{
        title:'亲情号码薄'
    },
    '/sleep':{
        title:'睡眠'
    },
    '/walk':{
        title:'计步'
    },
    '/heartbeat':{
        title:'心率'
    },
    '/blood':{
        title:'血压'
    },

}
const LeftIcon = (nowPath)=>{
    switch(nowPath){
        case '/':
            return <div  key="0" className="flexbox"><Icon size="lg" type="left"/><span className="text-black">返回</span></div>;
        default:
            return <div  key="0" className='flexbox'><Icon type="left"/><span className="text-black">返回</span></div>;
    }
}
const RightIcon = (nowPath)=>{
    switch(nowPath){
        case '/device-admin':
            return <Link key="0" to='/register-dev'>添加设备</Link>;
        case '/':
            return <Link key="1" to='/device-admin'>设备管理</Link>;
        case '/location':
            return <span onClick={()=>refresh()} key="2">刷新</span>;
        case '/medicine':
            return <Link key="3" to='/add-medicine'>添加</Link>;
        case '/mail-book':
            return <Link key="6" to='/add-mail'>添加</Link>;
        default:
            return null;
    }
}

class Header extends React.Component {
    //利用PropTypes记住所跳转每个页面的位置
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(){
        super();
        this.state={
            nowRoute:'设备选择',
            popVisible:false,
            selectedFamily:'碗豆'
        }
        this.changeFamily=this.changeFamily.bind(this);
        this.onLeftClick=this.onLeftClick.bind(this);
    }
    componentDidMount(){
        // fix 页面刷新时 ，nav title恢复默认的问题
        this.changeNavTitle();
    }
    componentWillReceiveProps(){
        // 路由改变时，切换title
        this.changeNavTitle()
    }
    changeNavTitle=()=>{
        // 切换title
        const nowPath = window.location.hash.substring(1);
        let title = '';
        if(routes[nowPath]!==undefined){
            title = routes[nowPath].title;
        }
        this.setState({
            nowRoute:title,
            nowPath:nowPath
        });
    }
    changeFamily(opt){
        this.setState({
            popVisible:false,
            selectedFamily:opt.props.value,
        })
    }
    onLeftClick(nowPath){
        const pathArr = [
            '/sleep',
            '/walk',
            '/blood',
            '/heartbeat'
        ]
        if(pathArr.indexOf(nowPath)!==-1){
            this.context.router.history.push('/')
        }else{
            window.history.back()
        }

    }
    render() {
        const nowPath = this.state.nowPath;
        return (

            <div className="header-bar">
                <NavBar
                    mode="light"
                    onLeftClick={()=>this.onLeftClick(nowPath)}
                    leftContent={[LeftIcon(nowPath)]}
                    rightContent={[
                        RightIcon(nowPath),
                    ]}
                >
                    <span>{this.state.nowRoute}</span>
                </NavBar>
            </div>)
    }
}

export default Header;