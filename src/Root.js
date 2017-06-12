import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './js/redux/store';

import App from './js/App';

export const Root = () => (
  <Provider store={store} key="provider">
    <BrowserRouter><App /></BrowserRouter>
  </Provider>
);
