import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import localStorage from './util/storage';


const render = ()=>ReactDOM.render(<App />, document.getElementById('root'));
/**
 * 如果是一生约APP进入页面需要URL加入参数
 * @param/userType
 * @value/ysyapp
 * 一生约app初始化 并挂载实例
 */
const appinit = window.appinit;

appinit(function (ysyapp) {


    /*
    * ysyapp: function
    * @params:
    *   data{*}:传入原生方法的参数
    *   funName{string}:原生方法名
    *   callback{function(res)}:调用成功后的回调，
    * */
    window.ysyapp =  ysyapp;

    /**
     * 获取登录信息
     */
    if(ysyapp){
        ysyapp({
            funName:'getUserId',
            data:"",
            callback:function (res) {
                localStorage.setOpenId(res.userId);
                localStorage.setYsyApi();
                render();

            }
        });
    }else{
        //userId=5a325c69b2574c9f8157f93e2abd3a0b
        // 在非app环境中
        localStorage.setOpenId('1ef7701580c7468ebbcd8ab4cfe956f9');
        localStorage.setYsyApi();
            render();

    }
});

registerServiceWorker();
