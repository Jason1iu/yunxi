import { Button, Input, Pagination, Select, Table } from "antd";
import { observer } from "mobx-react-lite";
import React from 'react';
import { FileAddOutlined, FileExcelOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from "../common";

const { Search } = Input;

export const Tables = router(observer(() => {

    function handleInputSearch(value: string) {
        console.log('value: ', value);
    }

    function handleSelectSearch(value: string) {
        console.log('value: ', value);
    }

    return (
        <div className="tables">
            <div className="toolbar">
                <Search
                    placeholder="input search text..."
                    allowClear={true}
                    enterButton="Search"
                    size="middle"
                    onSearch={(value: string) => handleInputSearch(value)}
                    style={{ width: '260px' }}
                />
                <Select onSelect={(value: string) => handleSelectSearch(value)} style={{ width: '100px', marginLeft: '8px' }}>
                    <Select.Option key="processing" value="processing">进行中</Select.Option>
                    <Select.Option key="success" value="success">已完成</Select.Option>
                    <Select.Option key="error" value="error">未完成</Select.Option>
                </Select>
                <div style={{ flexGrow: 1 }} />
                <Button type="primary" icon={<FileAddOutlined />}>添加</Button>
                <Button style={{ marginLeft: '8px' }} icon={<DeleteOutlined />}>添加</Button>
                <Button style={{ marginLeft: '8px' }} icon={<FileExcelOutlined />}>导出</Button>
            </div>
            <div className="site-layout-content">
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    bordered={false}
                    pagination={false}
                    style={{ flexGrow: 1 }}
                />
                <div className="pagination">
                    <Pagination
                        size="small"
                        total={50}
                        showTotal={(total: number) => `共${total}条`}
                        hideOnSinglePage={true}
                        onChange={(page: number) => { alert(page) }}
                    />
                </div>
            </div>
        </div>
    );
}));


const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];