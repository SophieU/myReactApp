import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';

class Heart extends React.Component {
    render() {
        return (
            <div>
                <HealthHeader now="心率"/>
                <DataBall now="心率"/>
                <div>
                    <Charts />
                </div>
            </div>)
    }
}

export default Heart;