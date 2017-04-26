import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { Router, Route , browserHistory ,IndexRedirect, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Cpm from './components/Cpm.jsx';
export default function CreateRoutes(){
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            <IndexRedirect to="/home"  component={Home} />
                <Route path="/home" component={Home}/>
                <Route path="/cpm" component={Cpm}/>

            </Route>
        </Router>
    )
}