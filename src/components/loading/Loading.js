import React from 'react';
import loadingImg from './loading.gif';
import './loading.scss';

class Loading extends React.Component {
    render() {
        let displayStyle = this.props.show===true?{display:""}:{display:"none"};
        return (
            <div className="loading-container" style={displayStyle}>
                <div className="loading-wrapper">
                    <img src={loadingImg} alt="loading" width="18px" height="18px"/>
                    <div className="loading-title">正在加载中...</div>
                </div>
            </div>)
    }
}

export default Loading;