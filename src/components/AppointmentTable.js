import React from 'react';

import {Table} from 'antd';

const dataSource = [{
    key: '1',
    time: '2018-02-28',
    hospital: '杭州第一医院',
    department: '儿科',
    doctor: '李垚',
    user: '李垚他媳妇',
    state: '已完成'
}, {
    key: '1',
    time: '2018-03-06',
    hospital: '杭州第一医院',
    department: '妇科',
    doctor: '李垚',
    user: '李垚他媳妇',
    state: '未完成'
}];

const columns = [{
    title: '就诊时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '医院',
    dataIndex: 'hospital',
    key: 'hospital',
}, {
    title: '科室',
    dataIndex: 'department',
    key: 'department',
},{
    title: '医生',
    dataIndex: 'doctor',
    key: 'doctor',
},{
    title: '挂号人',
    dataIndex: 'user',
    key: 'user',
},{
    title: '状态',
    dataIndex: 'state',
    key: 'state',
}];

class AppointmentTable extends React.Component {
    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={columns}/>
            </div>
        )
    }
}

export default AppointmentTable;