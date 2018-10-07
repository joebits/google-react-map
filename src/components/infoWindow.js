import React from "react";
import { Row, Col, Input, Button, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

export const InfoWindow = (props) => (
    <div style={{ minHeight: '12em', width: '24em' }}>
        <Row>
            <Col span={24}>
                <h2>Save location</h2>
                <p>Save your location to remeber where you want to go next!</p>
                <Form onSubmit={props.handleSubmit}>
                    <FormItem>
                        <Input id="inputField" placehoder="Save place" />
                    </FormItem>
                    <Button htmlType="submit" type="primary">Save</Button>
                </Form>
            </Col>
        </Row>
    </div>
);