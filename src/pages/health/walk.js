import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';

class Walk extends React.Component {
    render() {
        return (
            <div>
                <HealthHeader now="计步"/>
                <DataBall now="计步"/>
                <div>
                    <Charts />
                </div>
            </div>)
    }
}

export default Walk;