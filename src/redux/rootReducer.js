import { combineReducers } from "redux";
import { reducer } from './reducer';


const rootReducer = combineReducers({
    todosReducer: reducer
})

export default rootReducer;