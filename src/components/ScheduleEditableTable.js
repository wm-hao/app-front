import React from 'react';
import {Input, message, Popconfirm, Table} from 'antd';
import axios from 'axios';
import {ScheduleAdd, ScheduleDelete, ScheduleSelectAll, ScheduleUpdate, ServerUrl} from "./Constants";

const data = [];
const EditableCell = ({editable, value, onChange}) => (
    <div>
        {editable
            ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
            : value
        }
    </div>
);

class ScheduleEditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '医院编号',
            dataIndex: 'hospitalCode',
            render: (text, record) => this.renderColumns(text, record, 'hospitalCode'),
        }, {
            title: '科室编号',
            dataIndex: 'departmentCode',
            render: (text, record) => this.renderColumns(text, record, 'departmentCode'),
        }, {
            title: '医生编号',
            dataIndex: 'doctorCode',
            render: (text, record) => this.renderColumns(text, record, 'doctorCode'),
        }, {
            title: '预约日期',
            dataIndex: 'appointDay',
            render: (text, record) => this.renderColumns(text, record, 'appointDay'),
        }, {
            title: '预约限额',
            dataIndex: 'totalLimit',
            render: (text, record) => this.renderColumns(text, record, 'totalLimit'),
        }, {
            title: '剩余限额',
            dataIndex: 'leftLimit',
            render: (text, record) => this.renderColumns(text, record, 'leftLimit'),
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
        this.state = {data,count : 0};
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
        if (target.hospitalCode) {
            delete target.editable;
            this.setState({data: newData});
            this.cacheData = newData.map(item => ({...item}));
            axios.post(ServerUrl + ScheduleUpdate, {
                id: target['id'],
                departmentCode: target['departmentCode'],
                hospitalCode: target['hospitalCode'],
                appointDay: target['appointDay'],
                doctorCode: target['doctorCode'],
                totalLimit: target['totalLimit'],
                leftLimit: target['leftLimit']
            }).then(function (response) {
                if (response.data.result === 'success')
                    message.success('更新成功', 2);
                else
                    message.error('更新失败', 2);
            }).catch(function (error) {
                    message.error('系统出现故障');
            })
        }else{
            console.log('调用保存');
            axios.post(ServerUrl + ScheduleAdd, {
                departmentCode: target['departmentCode'],
                hospitalCode: target['hospitalCode'],
                appointDay: target['appointDay'],
                doctorCode: target['doctorCode'],
                totalLimit: target['totalLimit'],
                leftLimit: target['leftLimit']
            }).then(function (response) {
                if (response.data.result === 'success')
                    message.success('添加成功', 2);
            }).catch(function (error) {

            })
        }
    }

    add = () => {
        const { data ,count} = this.state;
        console.log(count + 1);
        const newData = {
            id: count + 1,
            departmentCode: '',
            hospitalCode: '',
            appointDay: '',
            doctorCode: '',
            totalLimit: '',
            leftLimit: ''
        };
        this.setState({
            data: [...data, newData]
        });
    };

    cancel(id) {
        console.log('id----------' + id);
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
        const self = this;
        const target = data.filter(item => id === item.id)[0];
        console.log(target);
        this.setState({
            data: data.filter(item => item.id !== id)
        });
        if (target) {
            axios.post(ServerUrl + ScheduleDelete, {
                id: target['id']
            }).then(function (response) {
                if (response.data.result === 'success'){
                    self.setState((prevState) =>
                        ({
                            count : prevState.count -1
                        })
                    );
                    message.success('删除成功', 2);
                }
            }).catch(function (error) {

            })
        }
    };

    render() {
        return (
            <div>
                <Table bordered dataSource={this.state.data} columns={this.columns} size={'small'}/>
                {/*<div style={{textAlign: 'center'}}>*/}
                    {/*<Button onClick={this.add} type={'primary'}>新增调度信息</Button>*/}
                {/*</div>*/}
            </div>
        )
    }


    componentDidMount() {
        const self = this;
        axios.post(ServerUrl + ScheduleSelectAll, {}).then(function (response) {
            console.log(response);
            self.saveData(response.data);
        }).catch(function (error) {

        })
    }

    saveData = (data) => {
        console.log('data 最后一个');
        console.log(data[data.length-1]);
        this.setState({
            data: data,
            count : data[data.length-1]
        })
    };
}

export default ScheduleEditableTable;