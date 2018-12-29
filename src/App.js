import React, { Component } from 'react';
import './App.scss';
import RouterCom from './router.js';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <div className='App'>
              <Router>
                  <RouterCom />
              </Router>
          </div>
        </Provider>

    );
  }
}


export default App;
