import {combineReducers} from 'redux';
import * as ActionTypes from './actionTypes';
import localStorage from '../util/storage';

/**
 * reducer就是一个纯函数，接收旧的state和action，返回新的state
 */

//需要存储的初始状态数据
const initialState={
    navRightShow:true, //show the right nav
};


//拆分Reducer

// set right nav show status
function hideNavRight(show=initialState.navRightShow,action){
    switch (action.type){
        case ActionTypes.Nav_RIGHT_SHOW:
            return action.show;
        default:
            return show;
    }
}

//合并Reducer
const reducer = combineReducers({
    hideNavRight,
});

export default reducer;
