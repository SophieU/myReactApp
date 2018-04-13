import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/header/header';
import Container from './pages/container/container'

class Router extends React.Component{
    render(){
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