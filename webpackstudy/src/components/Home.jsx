import React, {Component, PropTypes} from 'react';
import styles from '../styles/pages/home.css';
import md5 from 'blueimp-md5';



export default class Home extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.user.uid=80;
    }
    componentDidMount(){

    }
    deepCopy=(source)=>{
        let newObj = source.constructor == Array ? [] : {};
        for(let i in source){
            newObj[i] = typeof source[i] == 'object' ? this.deepCopy(source[i]) : source[i]
        }
        return newObj;
    };
    render(){
        return(
            <div className={styles.home}>
                <button className="btn btn-info col-xs-6 col-sm-3 col-md-2 col-lg-1">hello work</button>
                <span className="glyphicon glyphicon-asterisk"/>
                <div className={styles.bfc}>
                    <span className="test">hahaha</span>
                    <span>hahaha</span>
                </div>
            </div>
        )
    }
}