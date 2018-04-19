import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import Header from './components/header/header';
import Container from './pages/container/container'

class RouterCom extends React.Component{
    render(){
        return(
            <Router >
                <div>
                    <Header />
                    <Route path="/" component={Container}></Route>
                </div>
            </Router>
        )
    }
}
export default RouterCom;