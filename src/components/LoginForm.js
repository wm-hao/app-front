import React from 'react';
import {Form, Icon, Input, Checkbox, Button} from 'antd';
import axios from 'axios';
import {ServerUrl, UserLogin, UserValidate} from './Constants';
import {message, notification} from "antd/lib/index";

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
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
                <FormItem {...tailItemLayout}>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a className="login-form-forgot" href="/#/forgotPassword"
                       onClick={this.handleForgetPassword}>忘记密码?</a>
                </FormItem>
                <FormItem {...submitItemLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let userInfo = {};
        message.config({
            top: 200,
            duration: 4,
        });
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
                        }).catch(function (error) {
                            console.log(error);
                            message.error("登录遇到问题，登录失败！");
                        })
                    } else {
                        message.error("用户名或密码不正确，请重新登录！");
                        return {};
                    }
                }).catch(function (error) {
                    console.log(error);
                    message.error("登录遇到问题，登录失败！");
                })
            }
        });
        this.handleLoginSuccess(userInfo);
    };

    handleForgetPassword = () => {
        console.log('处理忘记密码')
    };

    handleLoginSuccess = (userInfo) => {
        notification.open({
            message: '登录成功通知',
            description: '在线预约挂号系统欢迎您！'
        });
        this.props.handleLoginSuccess(userInfo);
    }
}

export default LoginForm;