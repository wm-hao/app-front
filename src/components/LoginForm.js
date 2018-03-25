import React from 'react';
import {Form, Icon, Input, Checkbox, Button, Radio} from 'antd';
import axios from 'axios';
import {
    AdminSelectByPhoneNumber,
    DoctorValidateLogin,
    fail,
    ServerUrl,
    UserLogin,
    UserValidate,
    AdminValidteLogin,
    DoctorLogin
} from './Constants';
import {message, notification} from "antd/lib/index";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class LoginForm extends React.Component {

    render() {
        const formItemLayout = {
            labelCol: {
                lg: {span: 6, offset: 4}
            },
            wrapperCol: {
                lg: {span: 8}
            }
        };
        const tailItemLayout = {
            labelCol: {
                lg: {span: 6, offset: 4}
            },
            wrapperCol: {
                lg: {span: 8, offset: 10}
            }
        };
        const submitItemLayout = {
            labelCol: {
                lg: {span: 6, offset: 4}
            },
            wrapperCol: {
                lg: {span: 4, offset: 10}
            }
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                          label={'手机号码'}>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入您注册的手机号码'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'登录密码'}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入您的注册密码'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'用户类型'}>
                    {getFieldDecorator('userType', {
                        rules: [{required: true, message: '请选择登录用户类型'}],
                    })(
                        <RadioGroup onChange={this.onChange}>
                            <Radio value={'user'}>用户</Radio>
                            <Radio value={'doctor'}>医生</Radio>
                            <Radio value={'admin'}>管理员</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...tailItemLayout}>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="login-form-forgot" href="/#/forgotPassword"
                       onClick={this.props.handleForgetPassword}>忘记密码?</a>
                </FormItem>
                <FormItem {...submitItemLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }

    componentDidMount() {
        let userType = this.props.userType;
        console.log('login form userType:' + userType);
        const {setFieldsValue} = this.props.form;
        setFieldsValue({userType: userType});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const props = this.props;
        console.log('props userType' + props.userType);
        let userInfo = {};
        message.config({
            top: 200,
            duration: 3,
        });
        if ('user' === props.userType) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios.post(ServerUrl + UserValidate, {
                        phoneNumber: values.username,
                        password: values.password
                    }).then(function (response) {
                        if (response.data.result === 'success') {
                            axios.post(ServerUrl + UserLogin, {
                                phoneNumber: values.username
                            }).then(function (response) {
                                userInfo = response.data;
                                notification['success']({
                                    message: '登录成功通知',
                                    description: '在线预约挂号系统欢迎您！'
                                });
                                props.handleLoginSuccess(userInfo);
                            }).catch(function (error) {
                                console.log(error);
                                fail('通知面板', "登录遇到问题，登录失败！");
                            })
                        } else {
                            console.log('what error');
                            fail('通知面板', "用户名或密码不正确，请重新登录！");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        fail('通知面板', "登录遇到问题，登录失败！");
                    })
                }
            })
        } else if ( 'doctor' === props.userType) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios.post(ServerUrl + DoctorValidateLogin, {
                        phoneNumber: values.username,
                        password: values.password
                    }).then(function (response) {
                        if (response.data.result === 'success') {
                            axios.post(ServerUrl + DoctorLogin, {
                                phoneNumber: values.username
                            }).then(function (response) {
                                userInfo = response.data;
                                notification['success']({
                                    message: '登录成功通知',
                                    description: '在线预约挂号系统欢迎您！'
                                });
                                props.handleLoginSuccess(userInfo);
                            }).catch(function (error) {
                                console.log(error);
                                fail('通知面板', "登录遇到问题，登录失败！");
                            })
                        } else {
                            fail('通知面板', "用户名或密码不正确，请重新登录！");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        fail('通知面板', "登录遇到问题，登录失败！");
                    })
                }
            })
        } else if (props.userType === 'admin') {
            console.log('admin login');
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios.post(ServerUrl + AdminValidteLogin, {
                        phoneNumber: values.username,
                        password: values.password
                    }).then(function (response) {
                        if (response.data.result === 'success') {
                            axios.post(ServerUrl + AdminSelectByPhoneNumber, {
                                phoneNumber: values.username
                            }).then(function (response) {
                                userInfo = response.data;
                                notification['success']({
                                    message: '登录成功通知',
                                    description: '在线预约挂号系统欢迎您！'
                                });
                                props.handleLoginSuccess(userInfo);
                            }).catch(function (error) {
                                console.log(error);
                                fail('通知面板', "登录遇到问题，登录失败！");
                            })
                        } else {
                            fail('通知面板', "用户名或密码不正确，请重新登录！");
                        }
                    }).catch(function (error) {
                        console.log(error);
                        fail('通知面板', "登录遇到问题，登录失败！");
                    })
                }
            })
        }

    };

    onChange = (e) => {
        console.log( e.target.value);
        const {setFieldsValue} = this.props.form;
        setFieldsValue({userType: e.target.value});
        this.props.setUserType( e.target.value);
    }
}

export default LoginForm;