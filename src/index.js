/* eslint-disable react/jsx-filename-extension */
// Initial location for react components to be added to index.html's "root" div
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'antd/dist/antd.css';
import TeachSplashScreen from './components/TeachSplashScreen';
import StudSplashScreen from './components/StudSplashScreen';
// import './styles.css';

require('@babel/polyfill');

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
