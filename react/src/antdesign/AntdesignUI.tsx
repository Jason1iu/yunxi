import { Layout, Menu, Avatar, Button } from "antd";
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from "mobx-react";
import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { MenuInfo } from 'rc-menu/lib/interface';
import './index.less';

const { Header, Content, Footer } = Layout;
const { Tables } = require('./Tables');

function getParamByPathname(pathname: string = '', preffix: string = '', defaultValue: string): string {
    let value = defaultValue;
    if (pathname) {
        const str = pathname.slice(preffix.length);
        const arr = str?.split('/');
        if (arr?.length) {
            value = arr[0];
        }
    }
    return value;
}

interface AntdesignUIProps extends RouteComponentProps {
    dispatch: any;
}

export const AntdesignUI = observer((props: AntdesignUIProps) => {

    const currentKey = getParamByPathname(props.location.pathname, "/AntDesignUI/", "tables");

    function handleMenuClick(key: string) {
        if (currentKey !== key) {
            props.history.push(`/AntDesignUI/${key}`);
        }
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo">云汐·LOVE</div>
                <div className="options">
                    <div>
                        <Button type="text" icon={<SettingOutlined style={{ color: "#98a6ad", fontSize: '24px' }} />} />
                    </div>
                    <div>
                        <Avatar size="small" style={{ cursor: 'pointer', marginLeft: '32px', top: '-1px', backgroundColor: "#98a6ad", color: "#000" }} icon={<UserOutlined />} />
                    </div>
                </div>
                <Menu theme="dark" mode="horizontal" selectedKeys={[currentKey]} onClick={(info: MenuInfo) => handleMenuClick(String(info.key))}>
                    <Menu.Item key="cards">卡片</Menu.Item>
                    <Menu.Item key="tables">表格</Menu.Item>
                    <Menu.Item key="charts">图形</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Switch>
                    <Route path={'/AntDesignUI/cards'} component={() => <>cards</>} />
                    <Route path={'/AntDesignUI/tables'} component={Tables} />
                    <Route path={'/AntDesignUI/charts'} component={() => <>charts</>} />
                    <Redirect to={`/AntDesignUI/${currentKey}`} />
                </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                &copy;20200429 四川·成都
            </Footer>
        </Layout>
    );
});