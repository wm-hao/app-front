import React from 'react';
import axios from 'axios';
import {ServerUrl, RecordQryByUserCode, RecordQryByDoctorCode} from "./Constants";

import {Table} from 'antd';

const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无预约记录',
};

const columns = [{
    title: '就诊时间',
    dataIndex: 'appointmentTime',
    key: 'appointmentTime',
}, {
    title: '医院',
    dataIndex: 'hospitalName',
    key: 'hospitalName',
}, {
    title: '科室',
    dataIndex: 'departmentName',
    key: 'departmentName',
}, {
    title: '医生',
    dataIndex: 'doctorName',
    key: 'doctorName',
}, {
    title: '挂号人',
    dataIndex: 'userName',
    key: 'userName',
}, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
}];

class AppointmentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        }
    }

    render() {
        return (
            <div>
                <Table dataSource={this.state.records} columns={columns} pagination={{ pageSize: 5 }} locale={locale}/>
            </div>
        )
    }

    componentDidMount() {
        const self = this;
        const props = this.props;
        console.log(props);
        if(props.userType === 'user') {
            axios.post(ServerUrl + RecordQryByUserCode, {
                userCode: props.userInfo.userCode
            }).then(function (response) {
                console.log(response.data);
                self.saveRecords(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        }
        if(props.userType === 'doctor') {
            axios.post(ServerUrl + RecordQryByDoctorCode, {
                doctorCode: props.userInfo.doctorCode
            }).then(function (response) {
                console.log(response.data);
                self.saveRecords(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        }

    }

    saveRecords = (data) => {
        this.setState({
            records: data
        })
    }
}

export default AppointmentTable;