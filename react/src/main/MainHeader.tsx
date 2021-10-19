import React from 'react';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message, } from "antd";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getContextPath } from "../global";
import request from "../utils/request";
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { ReduxState } from '../store';

export default function MainHeader() {
    const { userInfo } = useSelector((state: ReduxState) => state.main);
    if (!userInfo) return <></>;

    const currentUser = userInfo.current;

    return (//navbar-dark
        <header className="navbar navbar-expand-md  bd-navbar container-fluid">
            <div className="navbar-brand d-flex flex-row">
                {/* <i className="icon iconfont icon-danghui" style={{ color: 'gold', fontSize: 30 }} /> */}
                <Title>云汐·科技</Title>
            </div>
            <button className="navbar-toggler" type="button" {...{ "data-toggle": "collapse", "data-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation" }}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav bd-navbar-nav flex-md-row align-item-center">
                    {getNavLinkContent()}
                </ul>
                <ul className="navbar-nav ms-md-auto">
                    {getWelcomeUser()}
                    {getLogoutContent()}
                </ul>
            </div>
        </header>
    );

    function getNavLinkContent() {

        const location = useLocation();
        const { pathname } = location;

        return (
            <>
                <li className="nav-item">
                    <Link to={`/home`} className={`nav-link ${pathname.startsWith("/home") ? "active" : ""}`}>
                        <i className="icon iconfont icon-dangzuzhibu me-1" />首页
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/system`} className={`nav-link ${pathname.startsWith("/system") ? "active" : ""}`}>
                        <i className="icon iconfont icon-dangyuanshezhi me-1" />
                        系统管理
                    </Link>
                </li>
            </>
        );
    }

    function onClickMenu(e: any) {
        if (e.key === 'logout') {
            window.close();
            return;
        }
        else {
            const url = `${getContextPath()}/api/user/change/` + e.key;
            const ret: any = request(url, { method: "GET" });
            ret.then((result: any) => {
                if (result.success) {
                    window.top?.location.replace(getContextPath());
                } else {
                    const msg = result.message;//['message'];
                    message.error(`权限切换失败 ${msg}!`);
                }
            }).catch((error: any) => {
                console.log('done error:', error);
            });
        }
    }

    function getWelcomeUser() {

        const allUsers = userInfo?.users || [];

        const menuItems: any = [];
        for (const key of Object.keys(allUsers)) {
            const u = allUsers[Number(key) ?? 0];
            const disabled = u.id === currentUser.id;
            menuItems.push(<Menu.Item key={u.id} disabled={disabled}><UserOutlined />{u.name}</Menu.Item>);
        }
        const userMenu = (
            <Menu selectedKeys={[]} onClick={onClickMenu}>
                {menuItems}
            </Menu>
        );
        return (
            <li className="nav-item active">
                <Dropdown overlay={userMenu} trigger={['hover']}>
                    <span className="nav-link mr-3" >欢迎：{currentUser.name}</span>
                </Dropdown>
            </li>
        )
    }


    function getLogoutContent() {
        return (
            <li className="nav-item active d">
                <Link className="nav-link mr-3" to={`${getContextPath()}/logout`}><LogoutOutlined style={{ marginTop: -5, position: 'relative' }} /> 退出</Link>
            </li>
        );
    }
}

export const Title = styled.span`
    font-weight:400;
    font-style: normal;
    font-size:20px;
    text-indent:10px;
    display:flex;
    align-items: center;
`;