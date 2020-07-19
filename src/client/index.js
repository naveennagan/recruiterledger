import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import Main from './components/Main.jsx';

//for debugging in front end 
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider >
  , document.getElementById('root'));