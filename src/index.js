import React from 'react';
import { render } from 'react-dom';
import './styles/index.less';
import Root from './containers/Root';
import store from './store';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

if (isProduction) {
  console.log('Welcome to console!');
} else {
  console.log('Looks like we are in development mode!');
}

document.addEventListener('DOMContentLoaded', e => {
  const rootElement = document.getElementById('root');

  render(<Root store={store} />, rootElement);
});
