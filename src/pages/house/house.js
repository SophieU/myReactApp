import React from 'react';
import Lists from './house-lists';
import Bind from './bind-house';
import {Route} from 'react-router-dom';

import banner from '../../images/banner.png';
import './house.scss';
class House extends React.Component {
    render() {
        let match = this.props.match;
        return (
            <div>
                <img className="banner" src={banner} alt="banner"/>


                <div className="house">
                    <Route exact path={`${match.url}`} component={Lists}></Route>
                    <Route exact path={`${match.url}/bind`} component={Bind}></Route>
                </div>
            </div>)
    }
}

export default House;