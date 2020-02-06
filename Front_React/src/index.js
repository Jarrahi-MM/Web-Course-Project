import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store";
import {Provider} from "react-redux";
import './globalStyles/bootstrap.css'

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));