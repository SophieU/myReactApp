import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';

import './scroll.scss';

class Scroll extends React.Component {
    componentDidUpdate(){
        // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh
        if(this.bScroll&&this.props.refresh===true){
            this.bScroll.refresh();
        }
    }
    componentDidMount(){
        this.scrollDOM = ReactDOM.findDOMNode(this.refs.scrollView);
        if(!this.bScroll){
            // 实例化scroll组件
            this.bScroll = new BScroll(this.scrollDOM,{
                scrollX:this.props.direction==="horizontal",
                scrollY:this.props.direction!=="horizontal",
                //实时派发scroll事件
                probeType:3,
                click:this.props.click
            });
            // 派发事件
            if(this.props.onScroll){
                this.bScroll.on("scroll",(scroll)=>{
                    this.props.onScroll(scroll);
                })
            }
        }
    }
    componentWillUnmount(){
        this.bScroll.off("scroll");
        this.bScroll=null;
    }
    refresh(){
        if(this.bScroll){
            this.bScroll.refresh()
        }
    }
    render() {
        return (
            <div className="scroll-view" ref="scrollView">
                {this.props.children}
            </div>)
    }
}

export default Scroll;