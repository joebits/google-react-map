import React from "react";
import { Row, Col, Button} from 'antd';

export const LocationWindow = (props) => (
    <div style={{ minHeight: '12em', width: '24em' }}>
        <Row>
            <Col span={24}>
                <h2>{props.showLocation.name}</h2>
                <Button htmlType="submit" type="danger">Delete location</Button>
            </Col>
        </Row>
    </div>
);