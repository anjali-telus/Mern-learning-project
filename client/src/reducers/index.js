import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import todos from './todos';

export default combineReducers({
     alert,auth,todos
     });