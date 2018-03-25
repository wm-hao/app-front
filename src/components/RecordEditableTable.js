import React from 'react';
import {Input, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import {GetAllRecord, ServerUrl, UpdateRecord, DeleteRecord} from "./Constants";

const data = [];
const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

class RecordEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '用户姓名',
            dataIndex: 'userName',
            render: (text, record) => this.renderColumns(text, record, 'userName'),
        }, {
            title: '预约时间',
            dataIndex: 'appointTime',
            render: (text, record) => this.renderColumns(text, record, 'appointTime'),
        }, {
            title: '医生姓名',
            dataIndex: 'doctorName',
            render: (text, record) => this.renderColumns(text, record, 'doctorName'),
        }, {
            title: '预约医院',
            dataIndex: 'hospitalName',
            render: (text, record) => this.renderColumns(text, record, 'hospitalName'),
        }, {
            title: '科室名称',
            dataIndex: 'departmentName',
            render: (text, record) => this.renderColumns(text, record, 'departmentName'),
        }, {
            title: '完成时间',
            dataIndex: 'finishTime',
            render: (text, record) => this.renderColumns(text, record, 'finishTime'),
        }, {
            title: '操作时间',
            dataIndex: 'optTime',
            render: (text, record) => this.renderColumns(text, record, 'optTime'),
        }, {
            title: '更新操作',
            dataIndex: 'update',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                     <Popconfirm title="确定取消?" onConfirm={() => this.save(record.id)} okText={'确定'}
                                                 cancelText={'取消'}>
                                        <a>保存</a>
                                     </Popconfirm>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id)} okText={'确定'} cancelText={'取消'}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                                : <a onClick={() => this.edit(record.id)}>编辑</a>
                        }
                    </div>
                );
            },
        }, {
            title: '删除操作',
            dataIndex: 'delete',
            render: (text, record) => {
                return (
                    <div className="editable-row-operations">
                        <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.id)} okText={'确定'} cancelText={'取消'}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        }];
        this.state = {data};
        this.cacheData = data.map(item => ({...item}));
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    handleChange(value, id, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({data: newData});
        }
    }

    edit(id) {
        const newData = [...this.state.data];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({data: newData});
        }
    }

    save(id) {
        console.log(id);
        const newData = [...this.state.data];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
            axios.post(ServerUrl + UpdateRecord, {
                id: target['id'],
                userName: target['userName'],
                userCode: target['userCode'],
                optTime: target['optTime'],
                appointTime: target['appointTime'],
                doctorCode: target['doctorCode'],
                doctorName: target['doctorName'],
                hospital: target['hospital'],
                department: target['department'],
                disease: target['disease'],
                finishTime: target['finishTime'],
                failReason: target['failReason'],
                hospitalCode: target['hospitalCode'],
                hospitalName: target['hospitalName'],
                departmentName: target['departmentName'],
                departmentCode: target['departmentCode']
            }).then(function (response) {
                if (response.data.result === 'success')
                    message.success('更新成功', 2);
            }).catch(function (error) {

            })
        }
    }

    cancel(id) {
        const newData = [...this.state.data];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
            delete target.editable;
            this.setState({data: newData});
        }
    }

    delete = (id) => {
        const data = [...this.state.data];
        console.log(id);
        const target = data.filter(item => id === item.id)[0];
        console.log(target);
        this.setState({data: data.filter(item => item.id !== id)});
        if (target) {
            axios.post(ServerUrl + DeleteRecord, {
                id: target['id']
            }).then(function (response) {
                if (response.data.result === 'success')
                    message.success('删除成功', 2);
            }).catch(function (error) {

            })
        }
    };

    render() {
        return (
            <div>
                <Table bordered dataSource={this.state.data} columns={this.columns} size={'small'}/>
            </div>
        )
    }


    componentDidMount() {
        const self = this;
        axios.post(ServerUrl + GetAllRecord, {}).then(function (response) {
            console.log(response);
            self.saveData(response.data);
        }).catch(function (error) {

        })
    }

    saveData = (data) => {
        this.setState({
            data: data
        })
    };
}

export default RecordEditableTable;