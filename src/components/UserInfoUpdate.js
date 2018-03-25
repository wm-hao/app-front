import React from 'react';
import {Icon, Input, Popconfirm, Table} from 'antd';
import axios from "axios/index";
import {fail, GetUserInfoInList, ServerUrl, UpdateUserByColumn, DoctorGetDoctorInfoInList, DoctorUpdateDoctorByColumn} from "./Constants";
import {notification} from "antd/lib/index";

const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '无信息',
};

class UserInfoUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            key: 'name',
            title: '信息',
            dataIndex: 'name',
            width: '30%'
        }, {
            key: 'content',
            title: '内容',
            dataIndex: 'content',
            render: (text, record) => (
                <EditableCell type={this.props.userType}
                    value={text} isEdit={record.key}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            )
        }, {
            key: 'operation',
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            record.key > this.props.editorKey
                            ?
                            <Popconfirm title="确认修改" onConfirm={() => this.onUpdate(record)} okText={'是'} cancelText={'否'} >
                                <a href="#/edit">完成修改</a>
                            </Popconfirm>
                            :  '不可修改'
                        ) : null
                );
            },
        }];

        this.state = {
            dataSource: []
        };
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            console.log('on Cell Change ' + value);
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                console.log('重新设置dataSource ==' + target + '--' + target[dataIndex] + '--' + dataIndex);
                target['content'] = value;
                this.setState({dataSource});
            }
        };
    };

    onUpdate = (record) => {
        console.log('onUpdate');
        const props = this.props;
        const dataSource = this.state.dataSource;

        console.log('record data:' + record + '==' + record.content + dataSource[record.key].content);
        if(this.props.userType === 'user') {
            axios.post(ServerUrl + UpdateUserByColumn,{
                idCard : props.userInfo.idcard,
                key: record.key,
                value: dataSource[record.key].content
            }).then(function (response) {
                if(response.data.result === 'success') {
                    notification['success']({
                        message: '个人信息更新通知',
                        description: '您已成功更新个人信息！'
                    });
                }else{
                    fail('错误面板', "修改信息失败！");
                }
            }).catch(function (error) {
                console.error(error);
                fail('错误面板', "获取信息失败，请联系管理员！");
            })
        }
        if(this.props.userType === 'doctor') {
            axios.post(ServerUrl + DoctorUpdateDoctorByColumn,{
                idCard : props.userInfo.idcard,
                key: record.key,
                value: dataSource[record.key].content
            }).then(function (response) {
                if(response.data.result === 'success') {
                    notification['success']({
                        message: '个人信息更新通知',
                        description: '您已成功更新个人信息！'
                    });
                }else{
                    fail('错误面板', "修改信息失败！");
                }
            }).catch(function (error) {
                console.error(error);
                fail('错误面板', "获取信息失败，请联系管理员！");
            })
        }

    };

    render() {
        const {dataSource} = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={dataSource} columns={columns} rowKey={record => record.key} locale={locale} />
            </div>
        );
    }

    componentDidMount() {
        const props = this.props;
        if(props.userType === 'user') {
            this.fetchUserData();
        }else if(props.userType === 'doctor') {
            this.fetchDoctorData();
        }
        console.log('update editor key:' + this.props.editorKey);
    };

    fetchUserData = () => {
       const self = this;
       const props = this.props;
       console.log('fetchUserData ');
       console.log(props);
       axios.post(ServerUrl + GetUserInfoInList, {
           idCard: props.userInfo.idcard
       }).then(function (response) {
           console.log(response.data);
           self.saveConvertedUserInfo(response.data);
       }).catch(function (error) {
           console.error(error);
       })
    };

    fetchDoctorData = () => {
        const self = this;
        const props = this.props;
        axios.post(ServerUrl + DoctorGetDoctorInfoInList, {
            idCard: props.userInfo.idcard
        }).then(function (response) {
            console.log(response.data);
            self.saveConvertedUserInfo(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    saveConvertedUserInfo = (data) => {
        this.setState({
            dataSource: data
        })
    };

}


class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        console.log('handle click ' + value);
        this.setState({value});
    };
    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit = () => {
        const isEdit = this.props.isEdit;
        console.log(isEdit);
        if(this.props.type === 'user') {
            if(isEdit > 3) {
                this.setState({editable: true});
            }
        }
        if(this.props.type === 'doctor') {
            if(isEdit > 6) {
                this.setState({editable: true});
            }
        }

    };

    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default UserInfoUpdate;