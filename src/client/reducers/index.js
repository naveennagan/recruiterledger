import { combineReducers } from 'redux';
import login from './login';
import home from './home';
import user from './user';
import pending from './pending';


const rootReducer = combineReducers({
  login,
  home,
  user,
  pending
});

export default rootReducer;