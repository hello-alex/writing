import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyA_dbsTV16M23o1kYtBaaFidEG89oODObM",
  authDomain: "writing-d0045.firebaseapp.com",
  databaseURL: "https://writing-d0045.firebaseio.com",
  projectId: "writing-d0045",
  storageBucket: "writing-d0045.appspot.com",
  messagingSenderId: "486753255279",
  appId: "1:486753255279:web:64fb3078b53972a3ca729a",
  measurementId: "G-GDETK26QK5"
});
ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
