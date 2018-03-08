import React from 'react';
import {Tabs} from 'antd';
import UserInfoForm from "./UserInfoForm";

const TabPane = Tabs.TabPane;
class UserInfoTabs extends React.Component {

    render() {
        return(
            <div>
                <Tabs tabPosition={'top'}>
                    <TabPane tab="个人信息" key="1"><UserInfoForm userInfo={this.props.userInfo}/></TabPane>
                    <TabPane tab="修改密码" key="2">密码修改</TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserInfoTabs;