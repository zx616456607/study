import {withRouter} from 'react-router';
import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import LeftSide from './LeftSide.jsx';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/pages/app.css';
import {BackTop} from 'antd';
import {observer} from "mobx-react";
import ObservableTodoStore from '../store/configureStore';
export let store = new ObservableTodoStore();

@observer
export default class App extends withRouter(Component){
    constructor(props){
        super(props)
    }

    render(){
        let childProps = _.extend({router:this.context.router,user:store.user}, this.props, this.props.all, this.state);
        delete childProps.children;
        return(
            <div className={styles.app}>
                {React.createElement(Header,childProps)}
                <div className={styles.container + ' clearFix'}>
                    {React.createElement(LeftSide,childProps)}
                    <div className={styles.wrapper}>
                        {React.cloneElement(this.props.children,childProps)}
                    </div>
                </div>
                <BackTop visibilityHeight={100}>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
                {React.createElement(Footer,childProps)}
            </div>
        )
    }
}