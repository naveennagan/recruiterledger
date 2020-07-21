import { combineReducers } from 'redux';
import login from './login';
import home from './home';


const rootReducer = combineReducers({
  login,
  home
});

export default rootReducer;