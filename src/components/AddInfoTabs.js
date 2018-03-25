import React from 'react';
import {Tabs, Form} from 'antd';
import AddScheduleForm from './AddScheduleForm';

const TabPane = Tabs.TabPane;
class AddInfoTabs extends React.Component {
    render() {
        let WrappedAddScheduleForm = Form.create()(AddScheduleForm);
        return(
            <div>
                <Tabs tabPosition={'top'}>
                    <TabPane tab="新增预约调度" key="1">
                        <WrappedAddScheduleForm />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default AddInfoTabs;