import React from 'react';
import {Form, Tabs} from "antd/lib/index";
import RegisterForm from "./RegisterForm";
import DoctorRegisterForm from "./DoctorRegisterForm";
import AdminRegisterForm from "./AdminRegisterForm";

const TabPane = Tabs.TabPane;
class RegisterCenter extends React.Component {
    render() {
        let WrappedUserRegisterForm = Form.create()(RegisterForm);
        let WrappedDoctorRegisterForm = Form.create()(DoctorRegisterForm);
        let WrappedAdminRegisterForm = Form.create()(AdminRegisterForm);
        return (
            <div>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="用户注册" key="1"><WrappedUserRegisterForm userInfo={this.props.userInfo} handleRegisterSuccess={this.handleRegisterSuccess} /></TabPane>
                    <TabPane tab="医生注册" key="2"><WrappedDoctorRegisterForm userInfo={this.props.userInfo} handleRegisterSuccess={this.handleRegisterSuccess} /></TabPane>
                    <TabPane tab="管理员注册" key="3"><WrappedAdminRegisterForm userInfo={this.props.userInfo} handleRegisterSuccess={this.handleRegisterSuccess} /></TabPane>
                </Tabs>
            </div>
        )
    }

    handleRegisterSuccess = () => {
        this.props.handleRegisterSuccess();
    };

    setUserType = (data) => {
        this.props.setUserType(data);
    }
}

export default RegisterCenter;