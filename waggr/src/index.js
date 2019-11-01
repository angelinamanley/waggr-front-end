import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(
    <BrowserRouter>
      <Route path="/" component={routerProps => <App {...routerProps} />} />
    </BrowserRouter>,
    document.getElementById('root')
  )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
