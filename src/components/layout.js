import React, { Component } from 'react';
import { Menu, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { showLocation } from '../store/actions';

const SubMenu = Menu.SubMenu;

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            locations: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    rootSubmenuKeys = ['menu'];

    componentWillReceiveProps({ locations }) {
        this.setState({ locations });
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    openLocation(id) {
        this.setState({ openKeys: [] });
        this.props.showLocation(id);
    }

    handleInputChange(e) {
        this.setState({ filterValue: e.target.value })
    }
    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 256, position: 'fixed', zIndex: 999 }}
            >
                <SubMenu key="menu" title={<span><Icon type="environment" /><span>My locations</span></span>}>
                    <Menu.Item key="filter" style={{ paddingLeft: '0px' }}><Input placeholder="Filter..." onChange={this.handleInputChange} value={this.state.filterValue} /></Menu.Item>
                    {this.state.locations
                        .filter(l => this.state.filterValue ? l.name.toUpperCase()
                            .includes(this.state.filterValue.toUpperCase()) : l)
                        .map(l =>
                            <Menu.Item key={l.id} onClick={() => this.openLocation(l.id)}>{l.name}</Menu.Item>
                        )}
                </SubMenu>
            </Menu>
        );
    }
}

const mapStateToProps = state => ({ locations: state.locations });

const mapDispatchToProps = (dispatch) => ({
    showLocation: (id) => dispatch(showLocation({ id: id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);