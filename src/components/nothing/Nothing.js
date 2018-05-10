import React from 'react';
import nothingImg from './nothing.png';
import './nothing.scss';

class Nothing extends React.Component {
    render() {
        let tips = this.props.title?this.props.title:'暂无数据';
        return (
            <div className="nothing" style={this.props.show?{display:""}:{display:"none"}}>
                <div className="nothing-box">
                    <img src={nothingImg} alt=""/>
                    <div className="nothing-tips">
                        <p>{tips}</p>
                    </div>
                </div>

            </div>)
    }
}

export default Nothing;