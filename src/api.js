import axios from 'axios';
import {Toast } from 'antd-mobile';

axios.interceptors.request.use((config)=>{
    Toast.loading('加载中...',0);
    return config;
},err=>{
    Toast.hide();
    if(err.code==='ECONNABORTED'||err.code===408){
        Toast.info('请求超时',1)
    }else{
        Toast.info('请求失败',1)
    }
    return Promise.reject(err)
});
axios.interceptors.response.use((config)=>{
    Toast.hide();
    return config;
},err=>{
    Toast.hide();
    // if(err.code==='ECONNABORTED'){
    //     Toast.info('服务器响应超时',1)
    // }else{
    //     Toast.info('响应失败',1)
    // }
    return Promise.reject(err)
});
axios.defaults.timeout=3000;
axios.defaults.baseURL = 'http://jk.anxinqiao.com/share';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export default axios;

