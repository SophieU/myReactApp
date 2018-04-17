import React from 'react';
import './location.scss';

const AMap = window.AMap;
const lgnlat = [104.076395,30.623233];
const watchCover = '<div class="loc-marker">' +
    '<img class="avatar" src="http://p3cnmw3ss.bkt.clouddn.com/header.jpg"/>' +
    '<div class="loc-text">' +
    '<div class="loc-title">成都市武侯区科华北路35号</div>' +
    '<p>刷新时间&nbsp;2秒前</p>'+
    '</div>'+
    '</div>'
class GeoLocation extends React.Component {
    constructor(){
        super();
        this.getNowGeo=this.getNowGeo.bind(this);
        this.locWatch = this.locWatch.bind(this);
        this.drawLine=this.drawLine.bind(this);
    }
    componentDidMount(){
        // 初始手表定位
        this.locWatch(lgnlat)
    }
    // 手表定位
    locWatch(){
        const map = new AMap.Map("geo-location",{
            zoom:14,
            center: lgnlat,
        })
        var marker = new AMap.Marker({ //添加自定义点标记
            map: map,
            position: lgnlat, //基点位置
            offset: new AMap.Pixel(0, 0), //相对于基点的偏移位置
            draggable: false,  //是否可拖动
            content: watchCover   //自定义点标记覆盖物内容
        });
    }
    // 获取手机定位
    getNowGeo(){
        const map = new AMap.Map("geo-location",{
            zoom:14,
            center: lgnlat,
        })
        // var marker = new AMap.Marker({ //添加自定义点标记
        //     map: map,
        //     position: lgnlat, //基点位置
        //     offset: new AMap.Pixel(0, 0), //相对于基点的偏移位置
        //     draggable: false,  //是否可拖动
        //     content: watchCover   //自定义点标记覆盖物内容
        // });
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
        // map.plugin(["AMap.ToolBar"],function(){
        //     var toolBar = new AMap.ToolBar({
        //         locationMarker:marker
        //     });
        //     map.addControl(toolBar)
        // })
    }
    //绘制轨迹
    drawLine(){
        const start = [104.143948,30.676779]
        var map = new AMap.Map("geo-location",{
            center:start,
            zoom:15
        });
        var marker = new AMap.Marker({
            map:map,
            position:start,
            icon:new AMap.Icon({
                size: new AMap.Size(45, 45),  //图标大小
                image: "https://resource.yishengyue.cn/walk.png",
                imageOffset: new AMap.Pixel(0, 5)
            }),
        })
        var lineArr = [
            [104.143948,30.676779],
            [104.144034,30.676474],
            [104.143717,30.676465],
            [104.144077,30.675699],
            [104.144066,30.675718],
            [104.144222,30.675764],
            [104.144436,30.675229],
            [104.143476,30.674906],
            [104.143717,30.674347],
            [104.143433,30.674287],
            [104.143267,30.674214],
            [104.14339,30.673914],
            [104.143084,30.673734],
            [104.14207,30.673392],
            [104.141979,30.673605],
            [104.141808,30.673881],
        ]
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
        marker.moveAlong(lineArr, 100);

    }
    render() {
        return (
            <div ref="location" className="geo-location-wrapper">
                <div id="geo-location"></div>
                <div className="controller">
                    <div onClick={this.locWatch}><img alt="" src={require('../../images/icon-watch.png')}/></div>
                    <div onClick={this.drawLine}><img alt="" src={require('../../images/icon-track.png')}/></div>
                    <div onClick={this.getNowGeo}><img alt="" src={require('../../images/icon-location.png')}/></div>
                </div>
            </div>)
    }
}

export default GeoLocation;