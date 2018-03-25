import React from 'react';
import {Icon, List, Calendar, Button} from 'antd';
import {
    GetHospitalByCode,
    ServerUrl,
    GetAvator,
    convertLevel,
    convertDepartment,
    GetDepartmentByCode,
    GetDepartmentAll,
    info,
    RecordAdd,
    success,
    fail
} from "./Constants";
import axios from "axios/index";
import moment from 'moment';

class DoAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospital: {},
            department: {},
            departments: [],
            departmentCode: '',
            appointTime: ''
        }
    }

    render() {
        const {currentDepartment} = this.props;
        const item = this.state.hospital;
        return (
            <div style={{width: 1100, height: 800}}>
                <div style={{margin: '10px 0  5px', fontSize: 18, fontWeight: 'bold', height: 30}}>预约医院</div>
                <div style={{width: 1100, height: 152, display: 'inline'}}>
                    <div style={{width: 202, height: 150, margin: '1px 0', float: 'left'}}>
                        <img src={GetAvator + item.image} alt={item.name}/>
                    </div>
                    <div style={{width: 500, height: 152, float: 'left'}}>
                        <div style={{height: 40}}>
                        </div>
                        <div style={{height: 72}}>
                            <div style={{margin: 4}}>{item.name}&nbsp;&nbsp;{convertLevel(item.level)}</div>
                            <div style={{margin: 4}}><Icon type={'phone'}/>&nbsp;{item.phone}</div>
                            <div style={{margin: 4}}><Icon type={'environment'}/>&nbsp;{item.address}</div>
                        </div>
                    </div>
                    <div style={{float: 'left'}}>
                        <p style={{fontSize: 18, fontWeight: 'bold'}}>预约规则: </p>
                        <p>1.周末不能够进行预约，选择预约将失败。</p>
                        <p>2.国家法定节假日不能预约，选择预约将失败。</p>
                        <p>3.特殊预约日期由预约医院决定。</p>
                    </div>
                </div>
                <div style={{margin: '170px 0 10px', width: 1100, height: 70}}>
                    {
                        currentDepartment !== ''
                            ?
                            <div><p style={{fontSize: 18, fontWeight: 'bold'}}>预约科室: </p>
                                <p>{convertDepartment(currentDepartment) + ' : ' + this.state.department.description}</p>
                            </div>
                            : <div>
                                <p style={{fontSize: 18, fontWeight: 'bold'}}>请选择科室:</p>
                                <List
                                    grid={{column: 9}}
                                    dataSource={this.state.departments}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <WrappedButton onChange={this.handleChange} item={item}/>
                                        </List.Item>
                                    )}
                                />
                            </div>
                    }
                </div>
                <div>
                    <div style={{float: 'left'}}>
                        <p style={{fontSize: 18, fontWeight: 'bold'}}>选择预约日期: </p>
                        <div style={{width: 600, border: '1px solid #d9d9d9', borderRadius: 4}}>
                            <Calendar onSelect={this.handleSelect} fullscreen={false} disabledDate={this.disabledDate}/>
                        </div>
                    </div>
                    <div style={{float: 'left', margin: ' 200px 100px'}}>
                        <Button type={'primary'} onClick={this.submitAppointment}>提交预约</Button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const props = this.props;
        console.log('do appoint' + props.currentHospital + ' doctor code=' + props.currentDoctor);
        console.log('do app moment: ' + moment().format('YYYYMMDD') + "----" + moment().isoWeekday());
        this.fetchData(ServerUrl + GetHospitalByCode, {hospitalCode: props.currentHospital});
        if (props.currentDepartment !== '') {
            this.fetchDepartment();
        } else {
            this.fetchDepartments();
        }
        this.setState({
            appointTime: moment().format('YYYYMMDD')
        });
        console.log(moment().format('YYYYMMDD'));
    }

    submitAppointment = () => {
        if(this.state.departmentCode === '') {
            fail('提交预约错误','请选择预约科室！');
            return;
        }
        let currentDay = moment().format('YYYYMMDD');
        if(this.state.appointTime === currentDay && (moment().isoWeekday() === 7 || moment().isoWeekday() === 6)) {
            fail('提交预约错误','请选择预约日期！');
            return;
        }
        const self = this;
        const props = this.props;
        let doctorCode = '';
        console.log('医生编码：' +  doctorCode + props.currentDoctor);
        if(props.currentDoctor) {
            doctorCode = '9999';
        }
        axios.post(ServerUrl + RecordAdd, {
            userCode: props.userInfo.userCode,
            userName: props.userInfo.name,
            appointTime: this.state.appointTime,
            departmentCode: this.state.departmentCode,
            hospitalCode: props.currentHospital,
            doctorCode: doctorCode
        }).then(function (response) {
            console.log(response.data);
            if (response.data.result === 'success') {
                if (response.data.data === '0') {
                    self.finishAppoint();
                    success('预约完成通知', '您已完成预约!可在个人中心查找预约记录!');
                }
                if (response.data.data === '1') {
                    fail('预约失败通知', '您选择的预约日期预约额度已达上限，请选择其他日期！');
                }
            } else {
                fail('预约失败通知', '抱歉预约失败！' + response.data.data);
            }
        }).catch(function (error) {
            console.error(error);
            fail('预约失败通知', '抱歉预约失败！请联系管理员');
        })
    };

    finishAppoint = () => {
        this.setState((prevState) => ({
            hospital: prevState.hospital,
            department: prevState.department,
            departments: prevState.departments,
            departmentCode: prevState.departmentCode,
            appointTime: prevState.appointTime
        }));
        this.props.handleFinishAppoint();
    };

    handleSelect = (moment) => {
        let date = moment.format('YYYYMMDD');
        info('日期选择面板', '您预约的日期为' + date);
        this.setState({
            appointTime: date
        })
    };

    disabledDate = (currentMoment) => {
        if (currentMoment.isoWeekday() === 6 || currentMoment.isoWeekday() === 7) {
            return true
        }
        return false;
    };

    handleChange = (data) => {
        console.log('do appoint get from wrapped button : ' + data.code);
        info('科室选择面板', '您选择了' + convertDepartment(data.code));
        this.setState({
            departmentCode: data.code
        })
    };

    fetchData = (url, params) => {
        const self = this;
        axios.post(url, params).then(function (response) {
            console.log(response.data);
            self.saveHospital(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    saveHospital = (data) => {
        this.setState({
            hospital: data
        })
    };

    fetchDepartment = () => {
        const self = this;
        const props = this.props;
        axios.post(ServerUrl + GetDepartmentByCode, {departmentCode: props.currentDepartment}).then(function (response) {
            console.log(response.data);
            self.saveDepartment(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    fetchDepartments = () => {
        const self = this;
        axios.post(ServerUrl + GetDepartmentAll, {}).then(function (response) {
            console.log(response.data);
            self.saveDepartments(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    saveDepartment = (data) => {
        const props = this.props;
        console.log(props.currentDepartment);
        this.setState({
            department: data,
            departmentCode: props.currentDepartment
        })
    };

    saveDepartments = (data) => {
        this.setState({
            departments: data
        })
    }

}

class WrappedButton extends React.Component {
    render() {
        const item = this.props.item;
        return (
            <div>
                <a href={'#/' + item.code} onClick={this.handleClick}>{item.name}</a>
            </div>
        )
    }

    handleClick = () => {
        const item = this.props.item;
        this.props.onChange(item);
    }
}

export default DoAppointment;