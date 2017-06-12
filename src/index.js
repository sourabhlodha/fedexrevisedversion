import React from 'react';
import { render } from 'react-dom';

import { Root } from './Root';
import './assets/styles/app.scss';

const renderApp = () => {
  render(<Root />, document.querySelector('react'));
};

renderApp();

// if (__DEV__) {
// console.log('Abhishek');
// console.log(process);
// console.log(module);
// console.log(process.env.NODE_ENV);
// }

// if (module.hot) {
//   module.hot.accept('../src', renderApp);  
// }
