import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from "mobx-react";

import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import { getContextPath, registerModule, stores } from './common';
import "./index.less";

//mobx采用严格模式
configure({ enforceActions: 'always' })

const { MainApp } = registerModule(require('./app')); //注册main模块
registerModule(require('./common'));

const __webpack_public_path__ = getContextPath();

const Root = () => {
    const appRoot = __webpack_public_path__ + '/';
    const supportsHistory = 'pushState' in window.history;

    return (
        <Provider {...stores}>
            <ConfigProvider locale={zh_CN}>
                <BrowserRouter basename={appRoot} forceRefresh={!supportsHistory}>
                    <MainApp />
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));