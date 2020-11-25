import React from 'react';
import { Menu } from 'antd';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMenuTree} from '../store/action/menuAction.js';

const renderMenuItem = (
    item // item.route 菜单单独跳转的路由
) => (
    <Menu.Item key={item.url} icon={<span className="anticon"><i className={item.icon}></i></span>}>
        <Link to={(item.route || item.url) + (item.query || '')}>
            {item.name}
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => (
    <Menu.SubMenu key={item.url} icon={<span className="anticon"><i className={item.icon}></i></span>} title={item.name}>
        {item.children.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

class SiderBar extends React.Component {
    constructor (props) {
        super(props);
        const {pathname} = props.location;
        this.state = {
            selectedKey: pathname,
            openKey: [pathname.substr(0, pathname.lastIndexOf('/'))],
        };
    }
    componentDidMount () {
        this.props.dispatch(getMenuTree());
    }
    menuClick (e) {
        this.setState({
            selectedKey: e.key,
        });
    }
    openMenu (v) {
        this.setState({
            openKey: v,
        });
    }
    render () {
        return (
            <div className="app_menu">
                <div className="app_menu_top">
                    <Menu
                        onClick={this.menuClick.bind(this)}
                        mode="inline"
                        selectedKeys={[this.state.selectedKey]}
                        openKeys={this.state.openKey}
                        onOpenChange={this.openMenu.bind(this)}
                        inlineCollapsed={this.props.collapsed}
                    >
                        {
                            this.props.menus.map((item) => (
                                item.children.length
                                    ? renderSubMenu(item)
                                    : renderMenuItem(item)
                            ))
                        }
                    </Menu>
                </div>
                <div className="app_menu_bottom" onClick={this.props.toggleCollapsed}>
                    <i className={this.props.collapsed ? 'icon iconfont iconzhankai1 collapsed' : 'icon iconfont iconzhankai1'}></i>
                </div>
            </div>
        );
    }
}

export default withRouter(connect((state) => ({
    menus: state.menuReducer,
}))(SiderBar));
