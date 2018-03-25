import React from 'react';
import {Form, Tabs} from 'antd';
import AppointmentTable from "./AppointmentTable";
import UserInfoTabs from "./UserInfoTabs";
import FeedBack from "./FeedBack";

const TabPane = Tabs.TabPane;
class UserCenter extends React.Component {
    render() {
        let WrappedForm = Form.create()(FeedBack);
        return (
            <div>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="我的预约" key="1"><AppointmentTable userInfo={this.props.userInfo} userType={this.props.userType}/></TabPane>
                    <TabPane tab="信息管理" key="2"><UserInfoTabs userInfo={this.props.userInfo} editorKey={3} userType={this.props.userType}/></TabPane>
                    <TabPane tab="意见反馈" key="3"><WrappedForm userInfo={this.props.userInfo} userType={this.props.userType}/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserCenter;