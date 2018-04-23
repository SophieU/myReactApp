## 参考访问 https://sophieu.github.io/smart-device-webapp/build/index.html

## 功能模块
- 设备管理
    1. 注册设备（涉及原生扫描） OK
    2. 设备选择列表 OK
    3. 设备管理（展示，删除，添加设备[同注册设备]） OK
- 首页（功能区引导链接）
    1. 各功能点链接 OK
    2. 小地图渲染 OK
- 定位
    1. 手表设备定位 OK
    2. 轨迹回放 OK
    3. 手机当前位置 OK
- 吃药提醒
    1. 闹钟列表（Switch开关切换）OK
    2. 添加提醒（react form组件及验证，antd时间组件）OK
    3. 重复设置（列表及antd checkbox组件）OK
- 号码簿
    1. 号码列表
    2. 添加号码（添加头像，昵称及电话字段） - antd form相关组件
- 健康记录
    1. 计步（总步数展示，echarts柱图展示，开关）
    2. 心率（echarts左滑查看历史数据）
    3. 血压
    4. 睡眠
- 微聊
    1. 目前用原生语音聊天功能

## 原生方法调用
/*
    * ysyapp: function
    * @params:
    *   data{*}:传入原生方法的参数
    *   funName{string}:原生方法名
    *   callback{function(res)}:调用成功后的回调，
    * */

## 原生方法名约定
1. 进入首页获取 userId
    getUserId
2. 跳转原生聊天室
    chatRoom
3. 跳转原生注册/绑定页
    bindDevice
4. 从首页点返回，退出安心桥H5
    backToNative

## H5对应页地址
1. 首页(目前在生产环境)
    http://192.168.0.24:3000/#/

