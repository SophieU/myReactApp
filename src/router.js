import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';
import Header from './components/header/header';
import Container from './pages/container/container'

class RouterCom extends React.Component{

    render(){
        return(
            <Router >
                <Route>
                    <Header />
                    <Route path="/" component={Container}></Route>
                </Route>
            </Router>
        )
    }
}
export default RouterCom;