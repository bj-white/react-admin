import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import App from './App';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import todoApp from './store/reducer/index.js';
import Login from './component/login/Login';

import 'antd/dist/antd.css';
import './style/reset.scss';

let store = createStore(
    todoApp,
    applyMiddleware(thunkMiddleware),
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
                <Route path="/app">
                    <App/>
                </Route>
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
