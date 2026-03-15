import React from "react";
import ReactDOM from "react-dom";
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom'

import './i18n';

window.addEventListener("pageshow", function(){
    if(localStorage.getItem('href') !== window.location.href)
        window.location.href = localStorage.getItem('href')?localStorage.getItem('href'):'/#/';
});

window.addEventListener("hashchange", function(){
    localStorage.href = window.location.href;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.bundle.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);

      // Check for updates periodically
      setInterval(function() {
        registration.update();
      }, 60 * 60 * 1000); // check every hour

      // Reload page when new SW takes control
      var refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Layout/>
        </HashRouter>
    </Provider>
, mountNode);