import {createStore} from 'redux';
import {counter} from './reducer1';

let store = createStore(counter);
export default store;