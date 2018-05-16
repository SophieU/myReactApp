import React, { Component } from 'react';
import './App.scss';
import RouterCom from './router.js';
import {Provider} from 'react-redux';
import store from './redux/store';

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <div className='App'>
            <RouterCom />
          </div>
        </Provider>

    );
  }
}


export default App;
