import React from 'react';
import {Tabs, Form} from 'antd';
import UserInfoUpdate from "./UserInfoUpdate";
import UpdatePassword from "./UpdatePassword";

const TabPane = Tabs.TabPane;
class UserInfoTabs extends React.Component {

    render() {
        let WrappedForm = Form.create()(UpdatePassword);
        return(
            <div>
                <Tabs tabPosition={'top'}>
                    <TabPane tab="个人信息" key="1"><UserInfoUpdate userInfo={this.props.userInfo} userType={this.props.userType} editorKey={this.props.editorKey}/></TabPane>
                    <TabPane tab="修改密码" key="2"><WrappedForm userInfo={this.props.userInfo} userType={this.props.userType}/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default UserInfoTabs;