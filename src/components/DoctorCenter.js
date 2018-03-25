import React from 'react';
import {Tabs} from 'antd';
import UserInfoTabs from './UserInfoTabs';
import AppointmentTable from "./AppointmentTable";
import FeedBack from "./FeedBack";
import {Form} from "antd/lib/index";

const TabPane = Tabs.TabPane;

class DoctorCenter extends React.Component {
render() {
    let WrappedForm = Form.create()(FeedBack);
    return (
        <div>
            <Tabs tabPosition={'left'}>
                <TabPane tab="用户预约" key="1"><AppointmentTable userInfo={this.props.userInfo} userType={this.props.userType}/></TabPane>
                <TabPane tab="信息管理" key="2"><UserInfoTabs userInfo={this.props.userInfo} userType={this.props.userType} editorKey={6}/></TabPane>
                <TabPane tab="意见反馈" key="3"><WrappedForm userInfo={this.props.userInfo} userType={this.props.userType}/></TabPane>
            </Tabs>
        </div>
    )
}
}

export default DoctorCenter;