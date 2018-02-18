import React from "react";
import ReactDOM from "react-dom";
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom'

const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Layout/>
        </HashRouter>
    </Provider>
, mountNode);