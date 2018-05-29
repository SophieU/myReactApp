import React from 'react';
import * as echarts from 'echarts';

class Charts extends React.Component {
    drawBar=()=>{
        var dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
        var data = [10, 18, 19, 23, 29, 33, 31, 12, 20, 32, 9, 14, 21, 12, 13, 33, 19, 12, 12, 22];
        var yMax = 50;
        var dataShadow = [];
        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        var option = {
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
                splitNumber:3,
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
            dataZoom:[ // x轴设置滑动缩放
                {
                    type:'inside',
                    xAxisIndex:[0],
                    startValue:0,
                    endValue:7,
                    filterMode: 'filter'
                }
            ],
            series: [
                {
                    type: 'bar',
                    barWidth:'60%',
                    data: data,
                }
            ]
        };
        let _this = this;
        var myChart = echarts.init(document.getElementById('chart-container'))
        myChart.setOption(option)
        myChart.on('click',function(param){
            let value = param.value;
            let axis = dataAxis[param.dataIndex];
           _this.props.setBall(value,axis)

        })

    }
    drawLine=()=>{
       const xAxisData =['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13'];
       const yAxisTop = [101,100,106,111,120,140,139,121,103,126,122,138,129];
       const yAxisBottom = [70,60,66,77,88,68,79,80,72,90,75,83,78];
       var option = {
           grid: {
               left: '5%',
               right: '2%',
               bottom: '8%',
               top:'8%',
               containLabel: true
           },
           dataZoom:[ // x轴设置滑动缩放
               {
                   type:'inside',
                   xAxisIndex:[0],
                   startValue:0,
                   endValue:7,
                   filterMode: 'filter'
               }
           ],
            xAxis:  {
                data: xAxisData,
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

                z: 10
            },
            yAxis: {
                type: 'value',
                splitNumber:3,
                axisLabel: {
                    padding:[0,0,14,0],
                    margin:-8,
                    formatter: '{value}mmHg',
                    inside:true,
                    textStyle: {
                        color: '#9B9B9B',
                        fontSize:'10px',
                    }
                },
                axisLine: {
                    lineStyle:{
                        color:'#F0F0F0'
                    }
                },
                axisTick: {
                    show: false
                },
            },
            series: [
                {
                    type:'line',
                    color:'#3C6DF8',
                    data:yAxisTop,
                },
                {
                    type:'line',
                    color:'#00D2FA ',

                    data:yAxisBottom,
                }
            ]
        };
        var myChart = echarts.init(document.getElementById('chart-container'))
        myChart.setOption(option);



    }
    componentDidMount(){
        const echartType = this.props.type;
        if(echartType==='line'){
            this.drawLine();
        }else{
            this.drawBar();
        }
    }
    render() {
        return (
            <div id="chart-container">

            </div>)
    }
}

export default Charts;