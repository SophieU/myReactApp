import React from 'react';
import {Link} from 'react-router-dom';
import {NavBar,Icon,Modal} from 'antd-mobile';
import PropTypes from 'prop-types';
import './header.scss';

const alert = Modal.alert;
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
        title:'编辑提醒'
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
const LeftIcon = (nowPath)=> <div  key="0" className="flexbox"><Icon size="lg" type="left"/><span className="text-black">返回</span></div>
const bindDevice = ()=>{
    if(ysyapp){
        ysyapp({
            funName:"bindDevice"
        });
        return false;
    }else{

    }
}
const RightIcon = (props)=>{
    switch(props.nowPath){
        case '/device-admin':
            return <span key="0" onClick={props.onClick}>添加设备</span>;
        case '/':
            return <Link key="1" to='/device-admin'>设备管理</Link>;
        case '/location':
            return <span key="2" onClick={props.onClick} >刷新</span>;
        case '/medicine':
            return <Link key="3" to='/add-medicine'>添加</Link>;
        case '/mail-book':
            return <Link key="4" to='/mail-book/add'>添加</Link>;
        default:
            return null;
    }
};
const ysyapp = window.ysyapp;
class Header extends React.Component {
    //利用PropTypes记住所跳转每个页面的位置
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(){
        super();
        this.state={
            nowRoute:'设备选择',
            popVisible:false,
            selectedFamily:'碗豆'
        };
        this.changeFamily=this.changeFamily.bind(this);
        this.onLeftClick=this.onLeftClick.bind(this);
    }
    componentWillMount(){
        // fix 页面刷新时 ，nav title恢复默认的问题
        this.changeNavTitle();
    }
    componentWillReceiveProps(){
        // 路由改变时，切换title
        this.changeNavTitle();
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
    };
    changeFamily(opt){
        this.setState({
            popVisible:false,
            selectedFamily:opt.props.value,
        })
    }
    onLeftClick(nowPath){
        const alert = Modal.alert;
        const pathArr = [
            '/sleep',
            '/walk',
            '/blood',
            '/heartbeat'
        ];

        if(nowPath==='/'){
            if(ysyapp){
                ysyapp({
                    funName:"backToNative"
                });
                alert("跳转到原生入口页");
            }else{

                this.context.router.history.push('/register')
            }
        }else if(pathArr.indexOf(nowPath)!==-1){

            this.context.router.history.push('/')
        }else{
            window.history.back()
        }

    }
    goRegister=()=>{
        const nowPath = this.state.nowPath;
        if(nowPath==="/device-admin"){
            if(ysyapp){
                ysyapp({
                    funName:"bindDevice"
                });
                return;
            }else{
                this.context.router.history.push('/register-dev')
            }
        }else if(nowPath === "/location"){
            refresh();
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
                        <RightIcon key={0} onClick={this.goRegister} nowPath = {nowPath}/>
                    ]}
                >
                    <span>{this.state.nowRoute}</span>
                </NavBar>
            </div>)
    }
}

export default Header;