import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./css/main.css";
import "./css/media.css";
import 'react-toastify/dist/ReactToastify.css';


import App from './components/app';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector("#root"));

