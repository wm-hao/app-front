import React from 'react';
import {Form, Input, Button, Icon, Row, Col} from 'antd';
import axios from 'axios';
import {message, notification} from "antd/lib/index";
import {ServerUrl, UserSendValidateCode, UserResolveForgot, success, fail, warning} from "./Constants";

const FormItem = Form.Item;

class ForgotPasswordForm extends React.Component {
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
                          label={'手机号码'}>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入您注册的手机号码'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="手机号码"  />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'新密码'}>
                    {getFieldDecorator('password', {
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
                        <Input placeholder="邮箱地址"  />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'邮箱验证码'}>
                    {getFieldDecorator('validateCode', {
                        rules: [{required: true, message: '请输入您收到邮件中的验证码'},{validator: this.checkValidateCode}],
                    })(
                        <Input placeholder="验证码" />
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

    checkValidateCode = (rule, value, callback) => {
        const form = this.props.form;
        console.log(this.state.validateCode);
        if(this.state.validateCode !== form.getFieldValue('validateCode')) {
            callback('您输入的验证码不正确');
        }else{
            callback();
        }
    };

    saveValidateCode = (code) => {
        this.setState({
            validateCode : code
        });
    };

    handleClick = () => {
        const {getFieldValue} = this.props.form;
        let phone = getFieldValue('username');
        let email = getFieldValue('email');
        if(!phone) {
            warning('警告', '您未填写手机号码！');
            return
        }
        if(!email) {
            warning('警告', '您未填写注册邮箱！');
            return
        }
        const self = this;
        console.log(phone + '--' + email);
        axios.post(ServerUrl + UserSendValidateCode, {
            phoneNumber: phone,
            email: email,
            validateCode: '',
            password: ''
        }).then(function (response) {
            console.log(response.data);
            if(response.data.result === 'success') {
                self.saveValidateCode(response.data.data);
                // message.success("发送验证码成功，去注意您的邮箱提醒！")
                success('通知面板', '发送验证码成功，请注意您的邮箱提醒！')
            }else{
                // message.error("发送验证码遇到问题，请联系系统管理员！");
                fail('通知面板', '发送验证码遇到问题，请联系系统管理员！');
            }
        }).catch(function (error) {
            console.log(error);
            fail('通知面板', "发送验证码遇到问题，请联系系统管理员！");
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const props = this.props;
        message.config({
            top: 200,
            duration: 4,
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post(ServerUrl + UserResolveForgot, {
                    phoneNumber: values.username,
                    password: values.password,
                    email: values.email,
                    validateCode: values.validateCode
                }).then(function (response) {
                    if (response.data.result === 'success') {
                            notification['success']({
                                message: '找回密码通知',
                                description: '您已成功找回密码,现在可以使用新密码登录了！'
                            });
                            props.handleForgotSuccess();
                    } else {
                       fail('通知面板', "您输入的验证码可能不正确，找回密码失败！");
                    }
                }).catch(function (error) {
                    console.log(error);
                    fail("找回密码遇到问题，请联系系统管理员！");
                })
            }
        });
    };

}

export default ForgotPasswordForm;