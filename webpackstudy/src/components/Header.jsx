import React, {Component, PropTypes} from 'react';
import { Row, Col, Button } from 'antd';
export default class Header extends Component{

    render(){
        return(
            <div>
                <Row>
                    <Col span={4} offset={20}><Button type="primary">登录</Button></Col>
                </Row>
            </div>
        )
    }
}