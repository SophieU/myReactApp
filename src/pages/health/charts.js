import React from 'react';
import * as echarts from 'echarts';

class Charts extends React.Component {
    drawBar=(data)=>{
        if(data.length===0) return;
        let xAxis=[];
        let yAxis=[];
        for(let i=0;i<data.length;i++){
            xAxis.push(data[i].date);
            yAxis.push(data[i].itemData);
        };
        var dataAxis = xAxis;
        var data = yAxis;
        // var yMax = 500;
        var dataShadow = [];
        // for (var i = 0; i < data.length; i++) {
        //     dataShadow.push(yMax);
        // }
        var option = {
            color:'#3C6DF8',
            tooltip: {
                trigger : 'axis',
                formatter:function(param){
                    let data = param[0]
                    let month = (new Date().getMonth()+1)+'月';
                    return month+data.name+'日'+'：'+data.value
                }
            },
            grid:{
                right:'2%',
                left:'15%'
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    textStyle: {
                        color: '#37394C'
                    },

                },
                axisLine:{
                    lineStyle:{
                        color:'#F0F0F0'
                    }
                },
                axisTick: {
                    show: false
                },
                z: 10,
                triggerEvent: true,
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


    }
    drawLine=()=>{
       const xAxisData =['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12','13'];
       const yAxisTop = [101,100,106,111,120,140,139,121,103,126,122,138,129];
       const yAxisBottom = [70,60,66,77,88,68,79,80,72,90,75,83,78];
       var option = {
           tooltip: { //点击查看详细数据
               trigger: 'axis'
           },
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
                axisPointer:{
                    label:{
                        formatter:function(params){
                            let now = new Date();
                            let dataStr =(now.getMonth() + 1)+'月'+params.value+'日';
                            return dataStr
                        }
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#F0F0F0'
                    }
                },
                z: 10,
                axisLabel:{
                    textStyle: {
                        color: '#37394C'
                    },
                    formatter:function(value,index){
                        let now = new Date();
                        let dataStr = [now.getMonth() + 1,value].join('-');
                        return dataStr
                    }
                }

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
                    name:'高压',
                    color:'#3C6DF8',
                    data:yAxisTop,
                },
                {
                    type:'line',
                    name:'低压',
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
        let data = this.props.data;
        if(!data||data.length===0) return;
        if(echartType==='line'){
            this.drawLine(data);
        }else{
            this.drawBar(data);
        }
    }
    componentWillReceiveProps(nextProps){
        let chartData = nextProps.data;
        const echartType = nextProps.type;
        if(!chartData||chartData.length===0) return;

        if(chartData.length!==0){
            if(echartType==='line'){
                this.drawLine(chartData);
            }else{
                this.drawBar(chartData);
            }
        }
    }
    render() {
        return (
            <div id="chart-container">

            </div>)
    }
}

export default Charts;