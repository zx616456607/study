import React, {Component, PropTypes} from 'react';
import styles from '../styles/pages/home.css';
export default class Home extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.user.uid=80;
    }
    componentDidMount(){
        console.log(this.props.user.uid)
    }
    render(){
        return(
            <div className={styles.home}>
                {this.props.user.uid}

            </div>
        )
    }
}