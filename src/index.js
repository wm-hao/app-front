import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App from './App';
// import AppRouters from './routers';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<AppRouters />, document.getElementById('root'));
registerServiceWorker();
