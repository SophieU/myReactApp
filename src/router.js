import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Header from './components/header/header';
import Container from './pages/container/container'

class Router extends React.Component{
    render(){
        console.log(window.location.pathname)
        return(
            <BrowserRouter>
                <div>
                    <Header />
                    <Container></Container>
                </div>
            </BrowserRouter>
        )
    }
}
export default Router;