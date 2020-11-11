import { observer } from "mobx-react";
import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { router } from "../common";

const { AntdesignUI } = require('../antdesign');

export const MainApp = router(observer(() => {

    function selectEntrance() {
        return (
            <div className="jumbotron w-100 h-100">
                <h1 className="display-4">你好！</h1>
                <p className="lead">本程序实现的目的。。。</p>
                <hr className="my-4" />
                <p>您可以选择以下任意进入。。。</p>
                <a href="/BootstrapUI" role="button" className="btn btn-outline-primary btn-lg">BootstrapUI</a>
                <a href="/AntDesignUI" role="button" className="ml-3 btn btn-outline-secondary btn-lg">AntDesignUI</a>
            </div>
        );
    }

    return (
        <Switch>
            <Route path="/entrance" render={() => selectEntrance()} />
            <Route path="/BootstrapUI" component={() => <></>} />
            <Route path="/AntDesignUI" component={AntdesignUI} />
            <Redirect to="/entrance" />
        </Switch>
    );
}));