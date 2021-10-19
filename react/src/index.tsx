import 'whatwg-fetch';
import "core-js/stable";
import "regenerator-runtime/runtime";
import "../resources/orgiconfont/iconfont.css";

import 'bootstrap';
import "./custom.scss";

import moment from 'moment';

moment.locale('zh-cn');

import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale-provider/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getContextPath } from './global';
import request from './utils/request';
import MainApp from './main/MainApp';

import { store } from './store';

const App = () => {
    return (
        <Provider store={store}>
            <ConfigProvider locale={locale}>
                <BrowserRouter basename={'/'}>
                    <MainApp />
                </BrowserRouter>
            </ConfigProvider>
        </Provider>

    );
};
ReactDOM.render(<App />, document.getElementById('root'));

const keepAlive = () => {
    request(getContextPath() + `/api/blank`, { method: 'GET' });
};
window.setInterval(keepAlive, 1000 * 60 * 5);
