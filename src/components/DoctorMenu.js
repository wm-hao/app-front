import React from 'react';
import {List, Button} from 'antd';
import axios from 'axios';
import {info, warning, GetDoctorImage, ServerUrl, GetAllDoctors} from "./Constants";


const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无医生信息',
};

class DoctorMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: []
        }
    }

    render() {
        return (
            <div>
                <List
                    pagination={{pageSize: 4}}
                    locale={locale}
                    dataSource={this.state.doctors}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <div style={{width: 1100, height: 152, display: 'inline'}}>
                                <div style={{width: 202, height: 150, margin: '1px 0', float: 'left'}}>
                                    <img src={GetDoctorImage + item.image} alt={item.name} style={{width:200,height:150}}/>
                                </div>
                                <div style={{width: 700, height: 152, float: 'left'}}>
                                    <div style={{height: 40}}>
                                    </div>
                                    <div style={{height: 72}}>
                                        <div style={{margin: 4}}>医师姓名:{item.name}&nbsp;&nbsp;医师等级:{item.level}</div>
                                        <div
                                            style={{margin: 4}}>所属医院:{item.hospitalname}&nbsp;所属科室:{item.departmentname}</div>
                                        <div style={{margin: 4}}>从医经历:{item.exprience}</div>
                                    </div>
                                </div>
                                <div style={{width: 100, height: 152, float: 'left', marginTop: 60}}>
                                    <WrappedButton handleClick={this.handleClick} hospitalCode={item.hospitalCode} doctorCode={item.doctorCode}
                                                   departmentCode={item.departmentCode}/>
                                </div>
                            </div>
                        </List.Item>)}
                />
            </div>
        )
    }

    handleClick = (hospitalCode, departmentCode, doctorCode) => {
        const props = this.props;
        if (props.userType !== 'user') {
            warning('警告面板', '当前用户非普通用户，不能预约');
            return;
        }
        if (!props.isLogin) {
            info('通知面板', '预约需要登录，请您新登录！');
            props.handleLogin();
        } else {
            props.setCurrentHospital(hospitalCode);
            props.saveCurrentDepartment(departmentCode);
            props.saveCurrentDoctor(doctorCode);
            props.handleDoAppointment();
        }
    };

    componentDidMount() {
        const self = this;
        axios.post(ServerUrl + GetAllDoctors, {}).then(function (response) {
            console.log(response.data);
            self.saveData(response.data);

        }).catch(function (error) {

        })
    }

    saveData = (data) => {
        this.setState({
            doctors: data
        })
    }

}


class WrappedButton extends React.Component {
    render() {
        return (
            <div>
                <Button type={'primary'} onClick={this.handleClick}>现在预约</Button>
            </div>
        )
    }

    handleClick = () => {
        const props = this.props;
        console.log(props.hospitalCode);
        props.handleClick(props.hospitalCode, props.departmentCode, props.doctorCode);
    }
}

export default DoctorMenu;