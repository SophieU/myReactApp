import React from 'react';
import * as echarts from 'echarts';

class Charts extends React.Component {
    componentDidMount(){
        var dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
        var data = [10, 18, 19, 23, 29, 33, 31, 12, 20, 32, 9, 14, 21, 12, 13, 33, 19, 12, 12, 22];
        var yMax = 50;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }

        var option = {
            // title: {
            //     text: '特性示例：渐变色 阴影 点击缩放',
            //     subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
            // },
            color:'#3C6DF8',
            grid:{
                right:'2%',
                left:'7%'
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    textStyle: {
                        color: '#37394C'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#F0F0F0'
                    }
                },
                axisTick: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    lineStyle:{
                        color:'#F0F0F0'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9B9B9B'
                    }
                },
                splitLine:{
                    show:false
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [

                {
                    type: 'bar',
                    barWidth:'60%',
                    data: data,

                    markPoint:{
                        data:[
                            {type:'max',name:'最大值'},
                            {type:'min',name:'最小值'}
                        ]
                    },

                }
            ]
        };
        var myChart = echarts.init(document.getElementById('chart-container'))
        myChart.setOption(option)
// Enable data zoom when user click bar.
        var zoomSize = 6;
        myChart.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });



    }
    render() {

        return (
            <div id="chart-container">

            </div>)
    }
}

export default Charts;