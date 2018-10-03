import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class Layout extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // componentDidMount() {
    // }

    render() {
        return (
            <Menu
                // onClick={this.handleClick}
                // selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="mail">
                    <Icon type="mail" />Navigation One
        </Menu.Item>
                <Menu.Item key="app" disabled>
                    <Icon type="appstore" />Navigation Two
        </Menu.Item>
            </Menu>
        );
    }
}

export default Layout