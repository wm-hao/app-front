import React from 'react';
import {Button, Col, Form, Icon, Input, Row} from 'antd';
import axios from 'axios';
import {message, notification} from "antd/lib/index";
import {
    DoctorUpdateDoctorByColumn, DoctorValidatePassword,
    fail,
    ServerUrl,
    success,
    UpdateUserByColumn,
    UserSendValidateCode,
    ValidatePassword,
    warning
} from "./Constants";

const FormItem = Form.Item;

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateCode: ''
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                lg: {span: 6, offset: 4}
            },
            wrapperCol: {
                lg: {span: 8}
            }
        };
        const submitItemLayout = {
            labelCol: {
                lg: {span: 4, offset: 2}
            },
            wrapperCol: {
                lg: {span: 12, offset: 10}
            }
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                          label={'原始密码'}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入您原始密码'}, {validator: this.checkPassword}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="原始密码"
                               type={'password'}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'新密码'}>
                    {getFieldDecorator('newPassword', {
                        rules: [{required: true, message: '请输入您的新密码'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="新密码"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}
                          label={'注册邮箱'}>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入您注册的邮箱地址'}],
                    })(
                        <Input placeholder="邮箱地址" disabled={true}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'邮箱验证码'}>
                    {getFieldDecorator('validateCode', {
                        rules: [{required: true, message: '请输入您收到邮件中的验证码'}, {validator: this.checkValidateCode}],
                    })(
                        <Input placeholder="验证码"/>
                    )}
                </FormItem>
                <FormItem {...submitItemLayout} label={''}>
                    <Row>
                        <Col span={10}>
                            <Button type="primary" onClick={this.handleClick}>
                                发送验证码
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" htmlType="submit">
                                修改密码
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        )
    };

    componentDidMount() {
        const props = this.props;
        const email = props.userInfo.email;
        props.form.setFieldsValue({email: email});
    }

    checkValidateCode = (rule, value, callback) => {
        const form = this.props.form;
        console.log(this.state.validateCode);
        if (this.state.validateCode !== form.getFieldValue('validateCode')) {
            callback('您输入的验证码不正确');
        } else {
            callback();
        }
    };

    saveValidateCode = (code) => {
        this.setState({
            validateCode: code
        });
    };

    handleClick = () => {
        const {getFieldValue} = this.props.form;
        let password = getFieldValue('password');
        let email = getFieldValue('newPassword');
        if (!password) {
            warning('警告', '您未填写原始密码！');
            return
        }
        if (!email) {
            warning('警告', '您未填写注册邮箱！');
            return
        }
        const self = this;
        const props = this.props;
        console.log(password + '--' + email);
        // if(this.props.userType === 'user') {
        axios.post(ServerUrl + UserSendValidateCode, {
            idCard: props.userInfo.idcard,
            email: props.userInfo.email,
            validateCode: '',
            password: ''
        }).then(function (response) {
            console.log(response.data);
            if (response.data.result === 'success') {
                self.saveValidateCode(response.data.data);
                // message.success("发送验证码成功，去注意您的邮箱提醒！")
                success('通知面板', '发送验证码成功，请注意您的邮箱提醒！')
            } else {
                // message.error("发送验证码遇到问题，请联系系统管理员！");
                fail('通知面板', '发送验证码遇到问题，请联系系统管理员！');
            }
        }).catch(function (error) {
            console.log(error);
            fail('通知面板', "发送验证码遇到问题，请联系系统管理员！");
        })
        // }
        // if(this.props.userType === 'doctor') {
        //     axios.post(ServerUrl + Doc, {
        //         idCard: props.userInfo.idcard,
        //         email: props.userInfo.email,
        //         validateCode: '',
        //         password: ''
        //     }).then(function (response) {
        //         console.log(response.data);
        //         if(response.data.result === 'success') {
        //             self.saveValidateCode(response.data.data);
        //             // message.success("发送验证码成功，去注意您的邮箱提醒！")
        //             success('通知面板', '发送验证码成功，请注意您的邮箱提醒！')
        //         }else{
        //             // message.error("发送验证码遇到问题，请联系系统管理员！");
        //             fail('通知面板', '发送验证码遇到问题，请联系系统管理员！');
        //         }
        //     }).catch(function (error) {
        //         console.log(error);
        //         fail('通知面板', "发送验证码遇到问题，请联系系统管理员！");
        //     })
        // }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const props = this.props;
        let newPassword = props.form.getFieldValue('newPassword');
        message.config({
            top: 200,
            duration: 4,
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (props.userType === 'user') {
                    console.log('Received values of form: ', values);
                    axios.post(ServerUrl + UpdateUserByColumn, {
                        key: '-1',
                        idCard: props.userInfo.idcard,
                        value: newPassword
                    }).then(function (response) {
                        if (response.data.result === 'success') {
                            notification['success']({
                                message: '修改密码通知',
                                description: '您已成功修改密码,下次登录请使用新密码！'
                            });
                            props.form.resetFields(['password', 'newPassword', 'validateCode']);
                        } else {
                            fail('通知面板', "修改密码失败！");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        fail("错误面板", '系统异常，请联系管理员');
                    })
                }
                if (props.userType === 'doctor') {
                    console.log('Received values of form: ', values);
                    axios.post(ServerUrl + DoctorUpdateDoctorByColumn, {
                        key: '-1',
                        idCard: props.userInfo.idcard,
                        value: newPassword
                    }).then(function (response) {
                        if (response.data.result === 'success') {
                            notification['success']({
                                message: '修改密码通知',
                                description: '您已成功修改密码,下次登录请使用新密码！'
                            });
                            props.form.resetFields(['password', 'newPassword', 'validateCode']);
                        } else {
                            fail('通知面板', "修改密码失败！");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        fail("错误面板", '系统异常，请联系管理员');
                    })
                }
            }
        });
    };

    checkPassword = (rule, value, callback) => {
        const props = this.props;
        let oldPassword = props.form.getFieldValue('password');
        if(this.props.userType === 'user') {
            axios.post(ServerUrl + ValidatePassword, {
                idCard: props.userInfo.idcard,
                password: oldPassword
            }).then(function (response) {
                if (response.data.result === 'success') {
                    callback();
                } else {
                    callback('您输入的原密码不正确');
                }
            }).catch(function (error) {
                console.error(error);
                fail("错误面板", '系统异常，请联系管理员');
            })
        }else if(this.props.userType === 'doctor') {
            axios.post(ServerUrl + DoctorValidatePassword, {
                idCard: props.userInfo.idcard,
                password: oldPassword
            }).then(function (response) {
                if (response.data.result === 'success') {
                    callback();
                } else {
                    callback('您输入的原密码不正确');
                }
            }).catch(function (error) {
                console.error(error);
                fail("错误面板", '系统异常，请联系管理员');
            })
        }
    }

}

export default UpdatePassword;