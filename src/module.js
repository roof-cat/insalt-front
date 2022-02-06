import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component.jsx';

import "core-js";
import "regenerator-runtime/runtime";

const container = document.createElement('div');
document.body.appendChild(container);

const insaltApp = (props)=> {
	ReactDOM.render(<Component {...props}/>, container);
}

export default insaltApp;
