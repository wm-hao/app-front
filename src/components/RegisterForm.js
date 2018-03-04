import React from 'react';
import {Form, Input, InputNumber, Radio, Checkbox, Button, } from 'antd';
import axios from 'axios';

const {Item} = Form;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let user = values;
                console.log(user);
                axios.post('http://localhost:8080/user/add', {
                    user
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });

    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('您两次输入的密码不一样');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

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
                lg: {span: 8, offset: 8}
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
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Item
                        label="姓  名"
                        {...formItemLayout}
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '姓名是必填字段',
                            }]
                        })(
                            <Input placeholder={'请输入您的真实姓名*'}/>
                        )}
                    </Item>
                    <Item
                        {...formItemLayout}
                        label="性  别"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('sex', {
                                rules: [{required: true, message: '性别是必选字段'}]
                            })( <RadioGroup>
                                <RadioButton value={1}>男</RadioButton>
                                <RadioButton value={0}>女</RadioButton>
                            </RadioGroup>)
                        }
                    </Item>
                    <Item
                        {...formItemLayout}
                        label="年  龄"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('age', {
                                rules: [{required: true, message: '年龄是必填字段'}]
                            })(<InputNumber min={1} max={999} step={3}/>)
                        }
                    </Item>
                    <Item
                        {...formItemLayout}
                        label={'家庭住址'}
                        hasFeedback
                    >
                        {
                            getFieldDecorator('address', {
                                rules: [{required: true, message: '住址是必填字段'}]
                            })(<Input placeholder={'请输入您的住址*'}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'身份证号'}
                          hasFeedback
                    >
                        {
                            getFieldDecorator('idCard', {
                                rules: [{required: true, message: '身份证号是必填字段'}]
                            })(<Input placeholder={'请输入您的真实身份证号*'} maxLength={18}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'手机号码'}
                          hasFeedback
                    >
                        {
                            getFieldDecorator('phoneNumber', {
                                rules: [{required: true, message: '手机号是必填字段'}]
                            })( <Input placeholder={'请输入您的手机号*'}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'密  码'}
                          hasFeedback
                    >
                        {
                            getFieldDecorator('password', {
                                rules: [{required: true, message: '密码是必填字段'},{validator: this.checkConfirm}]
                            })(<Input placeholder={'请输入您的密码*'} type={'password'}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'确认密码'}
                          hasFeedback
                    >
                        {
                            getFieldDecorator('confirm', {
                                rules: [{required: true, message: '请再次输入密码'},{validator: this.checkPassword}]
                            })(<Input placeholder={'请再次输入您的密码*'} type={'password'}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'Q  Q'}
                          hasFeedback
                    >
                        <Input maxLength={11} placeholder={'请输入您的QQ号(选填)'}/>
                    </Item>
                    <Item {...formItemLayout}
                          label={'邮  箱'}
                          hasFeedback
                    >
                        <Input placeholder={'请输入您的邮箱(选填)'}/>
                    </Item>
                    <Item {...tailItemLayout}>
                        {
                            getFieldDecorator('agree', {
                                valuePropName: 'checked',
                                initialValue: true,
                                rules: [{required: true, message: '请同意预约挂号服务协议才能注册'}]
                            })(<Checkbox>本人同意<a href="">《预约挂号服务协议》</a></Checkbox>)
                        }
                    </Item>
                    <Item {...submitItemLayout}
                    >
                        <Button type="primary" htmlType="submit">注册</Button>
                    </Item>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;