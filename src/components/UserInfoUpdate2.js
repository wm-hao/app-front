import React from 'react';
import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import axios from "axios/index";
import {GetUserInfoInList, ServerUrl} from "./Constants";

class UserInfoUpdate2 extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '信息',
            dataIndex: 'name',
            width: '30%'
        }, {
            title: '内容',
            dataIndex: 'content',
            render: (text, record) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            )
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    this.state.dataSource.length > 1 ?
                        (
                            <Popconfirm title="确认修改" onConfirm={() => this.onUpdate(record.key)} okText={'是'} cancelText={'否'} >
                                <a href="#">完成修改</a>
                            </Popconfirm>
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
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataSource});
            }
        };
    };

    onUpdate = (key) => {
        const dataSource = [...this.state.dataSource];
        console.log('onUpdate');
        console.log(dataSource);
        // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    };

    render() {
        const {dataSource} = this.state;
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={dataSource} columns={columns}/>
            </div>
        );
    }

    componentDidMount() {
        const self = this;
        const props = this.props;
        axios.post(ServerUrl + GetUserInfoInList, {
            phoneNumber: props.userInfo.phoneNumber
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
    }
}


class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
    };
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    };
    check = () => {
        this.setState({editable: false});
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    edit = () => {
        this.setState({editable: true});
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

export default UserInfoUpdate2;