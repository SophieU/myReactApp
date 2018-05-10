import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import Header from './components/header/header';
import Container from './pages/container/container';
import Scroll from './components/scroll/Scroll';

import './App.scss';

class RouterCom extends React.Component{
    constructor(){
        super()
        this.state={
            refreshScroll:false
        }
    }
    componentDidMount(){
        this.setState({refreshScroll:true});
    }
    render(){
        return(
            <Router >
                <div>
                    <Header />
                    <div className="app-content">
                        <Scroll  >
                            <Route  component={Container}></Route>
                        </Scroll>
                    </div>
                </div>
            </Router>
        )
    }
}
export default RouterCom;