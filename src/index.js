/* eslint-disable react/jsx-filename-extension */
// Initial location for react components to be added to index.html's "root" div
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'antd/dist/antd.css';
// import './styles.css';

require('@babel/polyfill');

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
