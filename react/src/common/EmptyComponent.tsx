import React from 'react';
import { Empty, Spin } from "antd";

interface EmptyComponentProps {
    /**
     * 是否显示加载中。默认否，为Empty组件；是，为Spin组件
     */
    isLoading?: boolean;
    /**
     * 自定义描述内容。默认内容为：暂无数据（Empty组件） 或者 加载中...(Spin组件)
     */
    description?: string;
}

export function EmptyComponent(props: EmptyComponentProps) {
    return (
        <div className="d-flex flex-fill justify-content-center align-items-center">
            {props.isLoading ?
                <Spin size="large" tip={props.description ?? "加载中..."} />
                :
                <Empty description={props.description ?? "暂无数据"} />
            }
        </div>
    );
}