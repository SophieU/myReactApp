import axios from 'axios';
import {Toast } from 'antd-mobile';

axios.interceptors.request.use((config)=>{
    Toast.loading('加载中...',0);
    return config;
},err=>{

    return Promise.reject(err)
});
axios.interceptors.response.use((config)=>{
    Toast.hide();
    return config;
});
axios.defaults.timeout=10000;
axios.defaults.baseURL = 'http://jk.anxinqiao.com/share';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


export default axios;

