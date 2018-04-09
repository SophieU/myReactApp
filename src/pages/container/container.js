import React from 'react';
import {Route,withRouter} from 'react-router-dom';
import ChooseDev from '../choose-device/choose-device'
import Index from '../index/index'

class Container extends  React.Component{
    render(){
        return(
            <div id="container">
                <Route exact path='/' component={ChooseDev}></Route>
                <Route path='/index' component={Index}></Route>
            </div>
        )
    }
}
export default Container