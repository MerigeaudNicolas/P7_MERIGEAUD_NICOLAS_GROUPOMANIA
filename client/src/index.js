// import de react + d'un module BrowserRouter depuis la librairie React

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';


// dev tools

import { composeWithDevTools } from 'redux-devtools-extension';

// création de route vers le lien App.js

import App from './App';

// création de lien pour la mise en page avec Sass

import './styles/index.scss';


// création de la route vers App

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getUsers());

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>    
         <App />
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
