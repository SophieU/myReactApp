import React from 'react';
import ReactDOM from 'react-dom';
import {Toast,DatePicker} from 'antd-mobile';
import localStorage from '../../util/storage';

import axios from '../../api';

import './location.scss';

let AMap ;

const lgnlat = [104.076395,30.623233];
const defaultAvatar='http://p3cnmw3ss.bkt.clouddn.com/defaultAvatar.png';
class GeoLocation extends React.Component {
    constructor(){
        super();
        let now = new Date();
        let oneHour = new Date(now.getTime()-3600000);
        this.state={
            openId:'',
            equipmentId:'',
            date:new Date(),
            timeStart:oneHour,
            timeEnd:now,
            showHistory:false,
            watchAdd:'',
            nowMap:'phoneLoc', //当前定位显示内容 phoneLoc:手机定位，watchLoc:手表定位,history:历史轨迹
        };
        this.getNowGeo=this.getNowGeo.bind(this);
        this.locWatch = this.locWatch.bind(this);
        this.drawLine=this.drawLine.bind(this);
    }
    componentDidMount(){
        let openId = localStorage.getOpenId();
        let equipmentId = localStorage.getEquipmentId();
        this.setState({
            openId,
            equipmentId
        });
        let timer = window.setInterval(()=>{
            if(window.AMap){
                AMap=window.AMap;
                window.clearInterval(timer);
                //放在API加载之后
                let query = this.props.location.search;
                console.log(query)
                if(query.indexOf('sos')!==-1){
                    // 报警跳转到定位
                    this.locWatch();
                }else{
                    // 默认初始手机定位
                    this.getNowGeo();
                }
            }
        },500);
    }
    componentWillReceiveProps(nextProps){
        let refreshMap = nextProps.refreshMap;
        let nowMap = this.state.nowMap;
        if(refreshMap){
            switch(nowMap){
                case 'phoneLoc':
                    this.getNowGeo();
                    break;
                case 'watchLoc':
                    this.locWatch();
                    break;
                case 'history':
                    this.getHistoryLine();
            }
        }
    }
    // 手表定位显示
    geolocation(lnglatXY){
        const _this = this;

        const map = new AMap.Map("geo-location",{
            zoom:15,
            center: lnglatXY,
        });

        AMap.service('AMap.Geocoder',function(){
            const geocoder = new AMap.Geocoder({})
            geocoder.getAddress(lnglatXY,function(status,result){
                if(status==="complete"&&result.info==='OK'){
                    let addressFormat = result.regeocode.formattedAddress;
                    let addressCom = result.regeocode.addressComponent;
                    // let address = addressCom.city+addressCom.district+addressCom.township+addressCom.street+addressCom.streetNumber+addressCom.building
                    let headImg = localStorage.getHeadImg();
                    // 请求头像
                    const watchCover = '<div class="loc-marker">' +
                        '<img class="avatar" src="'+headImg+'"/>' +
                        '<div class="loc-text">' +
                        '<div class="loc-title">'+addressFormat+'</div>' +
                        '<p>刷新时间&nbsp;2秒前</p>'+
                        '</div>'+
                        '</div>';
                    var marker = new AMap.Marker({ //添加自定义点标记
                        map: map,
                        position: lnglatXY, //基点位置
                        offset: new AMap.Pixel(0, 0), //相对于基点的偏移位置
                        draggable: false,  //是否可拖动
                        content: watchCover   //自定义点标记覆盖物内容
                    });
                    _this.setState({
                        watchAdd:addressFormat
                    });

                }else{
                    Toast.info('定位失败',1)
                }
            })
        })
    }
    // 手表定位
    locWatch(){
        this.setState({
            showHistory:false,
            nowMap:'watchLoc'
        });
        // Toast.info('已发送手表定位指令')
        axios.get(`/api/home/sendPositionCommand?openId=${this.state.openId}&equipmentId=${this.state.equipmentId}`)
            .then(res=>{
                if(res.data.success){
                    Toast.info('定位指定发送成功',1)
                }else{
                    Toast.info(res.data.msg,1)
                }
            })
            .then(()=>{

                axios.get(`/api/home/deviceData?openId=${this.state.openId}&equipmentId=${this.state.equipmentId}`)
                    .then(res=>{
                        if(res.data.success){
                            let data = res.data.data;
                            if(!data){
                               Toast.info('手表返回坐标：'+JSON.stringify(data),1)
                            }else{
                                let lgnlat = [data.longitude,data.latitude];
                                console.log(lgnlat)
                                this.geolocation(lgnlat,data.headImg)
                            }
                        }
                    })
                // 改变刷新状态为初始值
                this.props.refreshLocation(false)

            })
    }
    // 获取手机定位
    getNowGeo(){
        this.setState({
            nowMap:'phoneLoc'
        });
        const map = new AMap.Map("geo-location",{
            zoom:14,
            center: lgnlat,
        });
        var toolBar;
        var customMarker = new AMap.Marker({
            map:map,
            icon:new AMap.Icon({
                size: new AMap.Size(32, 32),  //图标大小
                image: "http://p3cnmw3ss.bkt.clouddn.com/add.png",
                offset:AMap.Pixel(0,0),
            }),
        })

        //地图中添加地图操作ToolBar插件
        map.plugin(["AMap.ToolBar"], function() {
            toolBar = new AMap.ToolBar({
                locationMarker: customMarker,
                liteStyle:true,
                position:'LT'
            }); //设置地位标记为自定义标记
            map.addControl(toolBar);
        });
        map.plugin('AMap.Geolocation',function(){
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LT',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:false,
            })
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
        })
        // 改变刷新状态为初始值
        this.props.refreshLocation(false)
    }
    //获取历史轨迹
    getHistoryLine=()=>{
        //验证时间范围规则
        let timeStart = this.state.timeStart;
        let timeEnd = this.state.timeEnd;
        if(new Date(timeStart).getTime()>new Date(timeEnd).getTime()){
            Toast.info('结束时间需大于开始时间',2);
            return ;
        }

        let openId = this.state.openId;
        let equipmentId = this.state.equipmentId;

        let dateA = this.formatTime(this.state.date,'day')+" "+this.formatTime(this.state.timeStart,'hours')+":00";
        let dateB = this.formatTime(this.state.date,'day')+" "+this.formatTime(this.state.timeEnd,'hours')+":00";
        let paramStr = '?openId='+openId+'&equipmentId='+equipmentId+"&dateA="+dateA+"&dateB="+dateB;

        axios.get(`/api/home/getHistoryPosition${paramStr}`)
            .then(res=>{
                if(res.data.success){
                    let lnglatHistory = res.data.data;
                    if(lnglatHistory.length===0){
                        Toast.info('手表无历史轨迹',1)
                    }else{
                        let lineArr=[];
                        lnglatHistory.forEach((item,index)=>{
                            lineArr.push([item.longitude,item.latitude])
                        });

                        this.drawLine(lineArr)
                    }
                }else{
                    Toast.info(res.data.msg,1)
                }
                console.log(res.data)
            })
    };
    //绘制轨迹
    drawLine(lineArr){
        // const start = [104.143948,30.676779]
        const start=lineArr[0];
        var map = new AMap.Map("geo-location",{
            center:start,
            zoom:15
        });
        var marker = new AMap.Marker({
            map:map,
            position:start,
            icon:new AMap.Icon({
                size: new AMap.Size(45, 45),  //图标大小
                image: "http://p3cnmw3ss.bkt.clouddn.com/add.png",
                imageOffset: new AMap.Pixel(0, 5)
            }),
        })

        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map:map,
            path:lineArr,
            strokeColor:"transparent",
        })
        // 走过路径
        var passedPolyline = new AMap.Polyline({
            map:map,
            strokeColor:"#3AA7FF"
        });
        marker.on('moving',function(e){
            passedPolyline.setPath(e.passedPath)
        })
        map.setFitView();
        if(lineArr.length>30){
            marker.moveAlong(lineArr, 4000);
        }else{
            marker.moveAlong(lineArr, 500);
        }
        // 改变刷新状态为初始值
        this.props.refreshLocation(false)

    }
    setTime=(time,state)=>{
        this.setState({
            [state]:time
        });
        // if(state==='timeEnd'){
        //     let timeStart = new Date(this.state.timeStart).getTime();
        //     let timeSelected = new Date(time).getTime();
        //     if(timeSelected<timeStart){
        //         Toast.info('请选择正确的时间段',1);
        //         return;
        //     }
        // }else if(state==='timeStart'){
        //     let timeEnd = new Date(this.state.timeEnd).getTime();
        //     let timeSelected = new Date(time).getTime();
        //     if(timeSelected>timeEnd){
        //         Toast.info('请选择正确的时间段',1);
        //         return;
        //     }
        // }

    };
    formatTime=(time,type)=>{
        if(type==='hours'){
            let hh = time.getHours()<10?'0'+time.getHours():time.getHours();
            let mm = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
            return hh+':'+mm;
        }else if(type==='day'){
            let yy = time.getFullYear();
            let month = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMont()+1;
            let day = time.getDate()<10?'0'+time.getDate():time.getDate();
            return yy+'-'+month+'-'+day;
        }

    };
    render() {
        let historyStyle=this.state.showHistory?{display:''}:{display:'none'};
        return (
            <div ref="location" className="geo-location-wrapper">
                <div id="geo-location"></div>
                <div className="history-time" style={historyStyle}>
                    <DatePicker
                        mode={"date"}
                        value={this.state.date}
                        onChange={time=>this.setTime(time,'date')}
                    >
                        <button className="date-btn">{this.formatTime(this.state.date,'day')}</button>
                    </DatePicker>

                    <DatePicker
                        mode={"time"}
                        value={this.state.timeStart}
                        onChange={time=>this.setTime(time,'timeStart')}
                    >
                        <button className="date-btn">{this.formatTime(this.state.timeStart,'hours')}</button>
                    </DatePicker>
                    <DatePicker
                        mode={"time"}
                        value={this.state.timeEnd}
                        onChange={time=>this.setTime(time,'timeEnd')}
                    >
                        <button className="date-btn">{this.formatTime(this.state.timeEnd,'hours')}</button>
                    </DatePicker>
                    <button onClick={this.getHistoryLine} className="draw-btn">足迹</button>

                </div>
                <div className="controller">
                    <div onClick={this.locWatch}><img alt="手表定位" src={require('../../images/icon-watch.png')}/></div>
                    <div onClick={()=>this.setState({showHistory:true,nowMap:'history'})}><img alt="历史轨迹" src={require('../../images/icon-track.png')}/></div>
                    <div onClick={this.getNowGeo}><img alt="手机定位" src={require('../../images/icon-location.png')}/></div>
                </div>
            </div>)
    }
}

export default GeoLocation;