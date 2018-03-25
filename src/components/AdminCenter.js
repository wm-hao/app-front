import React from 'react';
import UserEditableTable from "./UserEditableTable";
import {Tabs} from 'antd';
import DoctorEditableTable from './DoctorEditableTable';
import RecordEditableTable from './RecordEditableTable';
import ScheduleEditableTable from './ScheduleEditableTable';
import AddInfoTabs from './AddInfoTabs';

const TabPane = Tabs.TabPane;

class AdminCenter extends React.Component {
    render() {
        return (
            <div>
                <Tabs tabPosition={'left'}>
                    <TabPane tab="用户信息管理" key="1"><UserEditableTable/></TabPane>
                    <TabPane tab="预约信息管理" key="2"><RecordEditableTable/></TabPane>
                    <TabPane tab="医生信息管理" key="3"><DoctorEditableTable type={'doctor'}/></TabPane>
                    <TabPane tab="预约调度管理" key="4"><ScheduleEditableTable type={'schedule'}/></TabPane>
                    <TabPane tab="新增信息管理" key="5"><AddInfoTabs/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default AdminCenter;