import React from 'react';
import {Tabs} from 'antd';
import AppointmentTable from "./AppointmentTable";
import UserInfoTabs from "./UserInfoTabs";

const TabPane = Tabs.TabPane;

class PersonalCenter extends React.Component {

    render() {
        return (
            <div>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="我的预约" key="1"><AppointmentTable userInfo={this.props.userInfo}/></TabPane>
                    <TabPane tab="信息管理" key="2"><UserInfoTabs userInfo={this.props.userInfo}/></TabPane>
                    <TabPane tab="意见反馈" key="3">意见反馈</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default PersonalCenter;