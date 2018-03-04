import React from 'react';
import {Form, Icon, Input, Checkbox, Button} from 'antd';

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
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                label={'手机号码'}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入您注册的手机号码' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'登录密码'}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的注册密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
                    <a className="login-form-forgot" href="/#/forgotPassword" onClick={this.handleForgetPassword}>忘记密码?</a>
                </FormItem>
                <FormItem {...submitItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleForgetPassword = () => {
        console.log('处理忘记密码')
    };
}

export default LoginForm;