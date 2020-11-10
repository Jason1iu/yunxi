import { observer } from "mobx-react";
import React from 'react';

@observer
export class MainApp extends React.Component<any, any> {
    render() {
        return (
            <div className="w-100 h-100 d-flex flex-column">
                <div className="header">
                    <span className="title">云汐LOVE</span>
                </div>
                <div className="main">
                    Main
                </div>
                <div className="footer">
                    &copy;20200429 四川·成都
                </div>
            </div>
        );
    }
}