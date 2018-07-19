import React from 'react';
import UserEditableTable from "./UserEditableTable";
import {Tabs} from 'antd';
import DoctorEditableTable from './DoctorEditableTable';
import RecordEditableTable from './RecordEditableTable';
import ScheduleEditableTable from './ScheduleEditableTable';
import AddInfoTabs from './AddInfoTabs';
import {ScheduleSelectAll, ServerUrl} from "./Constants";
import axios from "axios/index";

const TabPane = Tabs.TabPane;

class AdminCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: 0
        }
    }
    handleTabsChange = (tabKey) => {
        console.log('切换面板' + tabKey);
        if(4 === tabKey) {

        }
    };
    render() {
        return (
            <div>
                <Tabs tabPosition={'left'} onChange={this.handleTabsChange}>
                    <TabPane tab="用户信息管理" key="1"><UserEditableTable/></TabPane>
                    <TabPane tab="预约信息管理" key="2"><RecordEditableTable/></TabPane>
                    <TabPane tab="医生信息管理" key="3"><DoctorEditableTable type={'doctor'}/></TabPane>
                    <TabPane tab="预约调度管理" key="4"><ScheduleEditableTable type={'schedule'} data={this.state.data} count={this.state.count}/></TabPane>
                    <TabPane tab="新增信息管理" key="5"><AddInfoTabs/></TabPane>
                </Tabs>
            </div>
        )
    }

    componentDidMount() {
        const self = this;
        axios.post(ServerUrl + ScheduleSelectAll, {}).then(function (response) {
            console.log(response);
            self.saveData(response.data);
        }).catch(function (error) {

        })
    }

    saveData = (data) => {
        console.log('data 最后一个');
        console.log(data[data.length-1]);
        this.setState({
            data: data,
            count : data[data.length-1]
        })
    };
}

export default AdminCenter;