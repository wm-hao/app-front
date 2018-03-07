import React from 'react';
import {Tabs} from 'antd';
import AppointmentTable from "./AppointmentTable";

const TabPane = Tabs.TabPane;

class PersonalCenter extends React.Component {

    render() {
        return (
            <div>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="我的预约" key="1"><AppointmentTable/></TabPane>
                    <TabPane tab="个人信息" key="2">个人信息</TabPane>
                    <TabPane tab="意见反馈" key="3">意见反馈</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default PersonalCenter;