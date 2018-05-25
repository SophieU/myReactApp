import React from 'react';
import HealthHeader from './health-header';
import DataBall from './data-ball';
import Charts from './charts';

class Blood extends React.Component {

    render() {
        return (
            <div className="blood">
                <HealthHeader now="血压"/>
                <DataBall now="血压"/>
                <div className="blood-intro">
                    <h4>温馨提示</h4>
                    <p>对于成年人，高于90/60mmHg且低于140/90mmHg的测量值通常被视为正常范围。</p>
                </div>
                <div>
                    <Charts  type="line"/>
                </div>
            </div>)
    }
}

export default Blood;