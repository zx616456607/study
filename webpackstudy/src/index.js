import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import CreateRoutes from './routers.js';
import './styles/global/reset.scss';
import './styles/global/components.scss';


render(<CreateRoutes />, document.getElementById('root'));