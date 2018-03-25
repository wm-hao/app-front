import React from 'react';
import {Button, DatePicker, Form, Input, InputNumber, message} from 'antd';
import axios from "axios";
import {ScheduleAdd, ServerUrl} from "./Constants";

const {Item} = Form;
class AddScheduleForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        message.config({
            top: 200,
            duration: 4,
        });
        const props = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(ServerUrl + ScheduleAdd, {
                    departmentCode: values.departmentCode,
                    hospitalCode: values.hospitalCode,
                    doctorCode: values.doctorCode,
                    appointDay: values.appointTime.format('YYYYMMDD'),
                    totalLimit: values.totalLimit
                })
                    .then(function (response) {
                        console.log(response.data.result);
                        if (response.data.result === 'success') {
                            message.success("新增成功！");
                            props.form.resetFields();
                        } else {
                            message.error("未能添加成功！" + response.data.data);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        message.error("本系统出现故障，请联系系统管理员！");
                    });
            }
        });
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
                        label="医院编码"
                        {...formItemLayout}
                        hasFeedback
                    >
                        {getFieldDecorator('hospitalCode', {
                            rules: [{
                                required: true, message: '医院编码必填',
                            }]
                        })(
                            <Input placeholder={'医院编码'}/>
                        )}
                    </Item>
                    <Item
                        {...formItemLayout}
                        label="科室编码"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('departmentCode', {
                                rules: [{required: true, message: '科室编码'}]
                            })(
                                <Input placeholder={'医院编码'}/>
                            )
                        }
                    </Item>
                    <Item
                        {...formItemLayout}
                        label="预约时间"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('appointTime', {
                                rules: [{required: true, message: '预约时间'}]
                            })(<DatePicker format={'YYYYMMDD'}/>)
                        }
                    </Item>
                    <Item
                        {...formItemLayout}
                        label={'医师编码'}
                        hasFeedback
                    >
                        {
                            getFieldDecorator('doctorCode', {

                            })(<Input placeholder={'医师编码(不填，默认当天值班医师)'}/>)
                        }
                    </Item>
                    <Item {...formItemLayout}
                          label={'当日预约限额'}
                          hasFeedback
                    >
                        {
                            getFieldDecorator('totalLimit', {
                                rules: [{required: true, message: '当日预约限额必须填写(上限500)'}]
                            })(<InputNumber min={0} max={500}/>)
                        }
                    </Item>
                    <Item {...submitItemLayout}
                    >
                        <Button type="primary" htmlType="submit">添加本条信息</Button>
                    </Item>
                </Form>
            </div>
        )
    }
}

export default AddScheduleForm;