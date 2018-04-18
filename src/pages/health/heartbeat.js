import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';

class Heart extends React.Component {
    render() {
        return (
            <div className="heart-beat">
                <HealthHeader now="心率"/>
                <DataBall now="心率"/>
                <div className="heart-intro">
                    <h4>温馨提示</h4>
                    <p>对于成年人，60-100次/每分钟的测量值通常被视为正常范围，低于60次/每分钟则偏低，高于100次/每分钟则偏高。</p>
                </div>
                <div>
                    <Charts  type="bar"/>
                </div>
            </div>)
    }
}

export default Heart;