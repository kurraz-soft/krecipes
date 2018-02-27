import React from "react";
import ReactDOM from "react-dom";
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom'

window.addEventListener("pageshow", function(){
    if(localStorage.getItem('href') !== window.location.href)
        window.location.href = localStorage.getItem('href')?localStorage.getItem('href'):'/#/';
});

window.addEventListener("hashchange", function(){
    localStorage.href = window.location.href;
});

/// #if PRODUCTION
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.bundle.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
/// #endif

const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Layout/>
        </HashRouter>
    </Provider>
, mountNode);