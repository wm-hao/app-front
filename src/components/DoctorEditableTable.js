import React from 'react';
import {Input, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import {GetAllDoctors, ServerUrl, UpdateDoctor, DeleteDoctor} from "./Constants";

const data = [];
const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

class DoctorEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: '年龄',
            dataIndex: 'age',
            render: (text, record) => this.renderColumns(text, record, 'age'),
        }, {
            title: '地址',
            dataIndex: 'address',
            render: (text, record) => this.renderColumns(text, record, 'address'),
        }, {
            title: '邮箱',
            dataIndex: 'email',
            render: (text, record) => this.renderColumns(text, record, 'email'),
        }, {
            title: '手机号码',
            dataIndex: 'phoneNumber',
            render: (text, record) => this.renderColumns(text, record, 'phoneNumber'),
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
            render: (text, record) => this.renderColumns(text, record, 'idcard'),
        }, {
            title: '从医经历',
            dataIndex: 'exprience',
            render: (text, record) => this.renderColumns(text, record, 'exprience'),
        }, {
            title: '性别',
            dataIndex: 'sex',
            render: (text, record) => this.renderColumns(text, record, 'sex'),
        }, {
            title: '医院编码',
            dataIndex: 'hospitalCode',
            render: (text, record) => this.renderColumns(text, record, 'hospitalCode'),
        }, {
            title: '科室编码',
            dataIndex: 'departmentCode',
            render: (text, record) => this.renderColumns(text, record, 'departmentCode'),
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
            axios.post(ServerUrl + UpdateDoctor, {
                id: target['id'],
                name: target['name'],
                email: target['email'],
                address: target['address'],
                idcard: target['idcard'],
                sex: target['sex'],
                age: target['age'],
                phoneNumber: target['phoneNumber'],
                password: target['password'],
                departmentCode: target['departmentCode'],
                hospitalCode: target['hospitalCode'],
                level: target['level'],
                exprience : target['exprience']
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
            axios.post(ServerUrl + DeleteDoctor, {
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
        axios.post(ServerUrl + GetAllDoctors, {}).then(function (response) {
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

export default DoctorEditableTable;