import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';

class Blood extends React.Component {
    render() {
        return (
            <div>
                <HealthHeader now="血压"/>
                <DataBall now="血压"/>
                <div>
                    <Charts />
                </div>
            </div>)
    }
}

export default Blood;