import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import CreateRoutes from './routers.js';
import './styles/global/reset.scss';
import './styles/global/components.scss';
import 'bootstrap/dist/css/bootstrap.css';

render(<CreateRoutes />, document.getElementById('root'));
