import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Menu, Row, Select} from 'antd';
import './App.css';
import Logo from './assets/img/logo.jpg';
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import PersonalCenter from "./components/PersonalCenter";
import HospitalMenu from "./components/HospitalMenu";
import DoAppointment from "./components/DoAppointment";
import moment from 'moment';
import 'moment/locale/zh-cn';
import SearchResult from "./components/SearchResult";
import RegisterCenter from "./components/RegisterCenter";
import DoctorMenu from "./components/DoctorMenu";

moment.locale('zh-cn');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentComponent: 'hospital',
            currentMenu: 'hospital',
            userInfo: {},
            isLogin: false,
            currentHospital: '',
            currentDepartment: '',
            searchType: 'hospital',
            searchEnable: false,
            searchContent: '',
            userType: 'user',
            currentDoctor: ''
        }
    }

    renderIndexMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderRegisterMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="register">
                        注册页
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderLoginMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="login">
                        登录页
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderPersonalMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="personal">
                        个人中心
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderForgotMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="forgot">
                        找回密码
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderAppointmentMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="appointment">
                        预约详情页
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderSearchResultMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                    <Menu.Item key="search">
                        查询结果
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderDoctorMenu = () => {
        return (
            <div>
                <Menu onClick={this.handleMenuClick}
                      selectedKeys={[this.state.currentMenu]}
                      mode="horizontal">
                    <Menu.Item key="hospital">
                        按医院挂号
                    </Menu.Item>
                    <Menu.Item key="department">
                        按科室挂号
                    </Menu.Item>
                    <Menu.Item key="doctor">
                        医生列表
                    </Menu.Item>
                </Menu>
            </div>
        )
    };

    renderTopRow = () => {
        return (
            <Row>
                <Col span={18}>
                    <Icon type="phone" style={{fontSize: 20}}/>
                    &nbsp;010-114/116114电话预约
                </Col>
                <Col span={6}>
                    <div style={{textAlign: 'right'}}>
                        欢迎来到在线预约挂号平台,请<a href={'#/login'} onClick={this.handleLogin}>登录</a>或<a href={'#/register'}
                                                                                               onClick={this.handleRegister}>注册</a>
                    </div>
                </Col>
            </Row>
        )
    };

    renderTopRowLogin = () => {
        return (
            <Row>
                <Col span={18}>
                    <Icon type="phone" style={{fontSize: 20}}/>
                    &nbsp;010-114/116114电话预约
                </Col>
                <Col span={6}>
                    <div style={{textAlign: 'right'}}>
                        欢迎您,
                        {this.state.userType === 'user'
                            ? '用户'
                            : (this.state.userType === 'doctor'
                                    ? '医生'
                                    : (this.state.userType === 'admin'
                                            ? '管理员'
                                            : ''
                                    )
                            )
                        }
                        {this.state.userInfo.name}&nbsp;&nbsp;<a href={'#/login'}
                                                                 onClick={this.enterPersonalCenter}>个人中心</a>或<a
                        href={'#/register'}
                        onClick={this.handleLogout}>退出</a>
                    </div>
                </Col>
            </Row>
        )
    };

    render() {
        let TopRowComponent;
        let ContentComponent;
        let MenuComponent;
        let WrappedForm;

        const contentComponentName = this.state.contentComponent;
        const isLogin = this.state.isLogin;

        if ('register' === contentComponentName) {
            ContentComponent = <RegisterCenter handleRegisterSuccess={this.handleRegisterSuccess}/>;
            MenuComponent = this.renderRegisterMenu();
        } else if ('login' === contentComponentName) {
            WrappedForm = Form.create()(LoginForm);
            ContentComponent =
                <WrappedForm handleForgetPassword={this.handleForgetPassword} setUserType={this.setUserType}
                             handleLoginSuccess={this.handleLoginSuccess} userType={this.state.userType}/>;
            MenuComponent = this.renderLoginMenu();
        } else if ('personal' === contentComponentName) {
            ContentComponent = <PersonalCenter userInfo={this.state.userInfo} userType={this.state.userType}/>;
            MenuComponent = this.renderPersonalMenu();
        } else if ('forgot' === contentComponentName) {
            WrappedForm = Form.create()(ForgotPasswordForm);
            ContentComponent = <WrappedForm handleForgotSuccess={this.handleForgotSuccess}/>;
            MenuComponent = this.renderForgotMenu();
        } else if ('hospital' === contentComponentName) {
            ContentComponent =
                <HospitalMenu isLogin={this.state.isLogin} handleUnLogin={this.handleLogin} isByDepartment={false}
                              setCurrentHospital={this.setCurrentHospital} userType={this.state.userType}
                              saveCurrentDepartment={this.saveCurrentDepartment} saveCurrentDoctor={this.saveCurrentDoctor}
                              handleDoAppointment={this.handleDoAppointment} searchEnable={this.state.searchEnable}
                              searchType={this.state.searchType} searchContent={this.state.searchContent}/>;
            MenuComponent = this.renderIndexMenu();
        } else if ('department' === contentComponentName) {
            ContentComponent =
                <HospitalMenu isLogin={this.state.isLogin} handleUnLogin={this.handleLogin} isByDepartment={true}
                              setCurrentHospital={this.setCurrentHospital} userType={this.state.userType}
                              saveCurrentDepartment={this.saveCurrentDepartment} saveCurrentDoctor={this.saveCurrentDoctor}
                              handleDoAppointment={this.handleDoAppointment} searchEnable={this.state.searchEnable}
                              searchType={this.state.searchType} searchContent={this.state.searchContent}/>;
            MenuComponent = this.renderIndexMenu();
        } else if ('appointment' === contentComponentName) {
            ContentComponent =
                <DoAppointment userInfo={this.state.userInfo} currentHospital={this.state.currentHospital}
                               currentDepartment={this.state.currentDepartment}
                               setCurrentHospital={this.setCurrentHospital}
                               saveCurrentDepartment={this.saveCurrentDepartment} saveCurrentDoctor={this.saveCurrentDoctor}
                               handleFinishAppoint={this.renderIndexMenu} currentDoctor={this.state.currentDoctor}/>;
            MenuComponent = this.renderAppointmentMenu();
        } else if ('search' === contentComponentName) {
            ContentComponent =
                <SearchResult isLogin={this.state.isLogin} handleUnLogin={this.handleLogin} isByDepartment={true}
                              setCurrentHospital={this.setCurrentHospital} userType={this.state.userType}
                              saveCurrentDepartment={this.saveCurrentDepartment} saveCurrentDoctor={this.saveCurrentDoctor}
                              handleDoAppointment={this.handleDoAppointment} searchEnable={this.state.searchEnable}
                              searchType={this.state.searchType} searchContent={this.state.searchContent}/>;
            MenuComponent = this.renderSearchResultMenu();
        } else if ('doctor' === contentComponentName) {
            ContentComponent =
                <DoctorMenu userType={this.state.userType} handleLogin={this.handleLogin} isLogin={this.state.isLogin}
                            setCurrentHospital={this.setCurrentHospital} saveCurrentDoctor={this.saveCurrentDoctor}
                            saveCurrentDepartment={this.saveCurrentDepartment} handleDoAppointment={this.handleDoAppointment}/>;
            MenuComponent = this.renderDoctorMenu();
        }

        if (isLogin) {
            TopRowComponent = this.renderTopRowLogin();
        } else {
            TopRowComponent = this.renderTopRow();
        }

        return (
            <div style={{margin: '0 10%'}}>
                {TopRowComponent}
                <Row>
                    <Col span={16}>
                        <div style={{marginTop: '2%'}}>
                            <img src={Logo} alt={'网站LOGO'}/>
                            <span style={{fontSize: 28, color: '#006db3', fontWeight: 'bold'}}>
                                在线预约挂号系统
                            </span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div style={{textAlign: 'left', marginTop: '8%', float: 'right'}}>
                            <Button onClick={this.handleSearch} type={'primary'} icon={'search'}>
                                搜索
                            </Button>
                        </div>
                        < div style={{textAlign: 'left', marginTop: '8%', float: 'right'}}>
                            <Input.Group compact>
                                < Select defaultValue={this.state.searchType} onChange={this.handleSelectChange}>
                                    <Select.Option value="hospital">医院</Select.Option>
                                    {/*<Select.Option value="department">科室</Select.Option>*/}
                                </Select>
                                <Input style={{width: '175px'}} defaultValue="" placeholder={"请输入医院名称"}
                                       onChange={this.searchChange}/>
                            </Input.Group>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{margin: '2% 0'}}>
                            {MenuComponent}
                        </div>
                    </Col>
                </Row>
                {ContentComponent}
            </div>
        );
    }

    componentDidUpdate() {
        console.log(this.state);
    };

    handleLogin = () => {
        this.setState({
            contentComponent: 'login',
            currentMenu: 'login'
        })
    };

    handleRegister = () => {
        this.setState({
            contentComponent: 'register',
            currentMenu: 'register'
        })
    };

    handleMenuClick = (clickParams) => {
        console.log('you click menu key :' + clickParams.key);
        this.setState({
            contentComponent: clickParams.key,
            currentMenu: clickParams.key,
            currentDepartment: '',
            currentHospital: '',
            searchType: 'hospital',
            searchEnable: false,
            searchContent: ''
        })
    };

    handleRegisterSuccess = () => {
        console.log('invoke handleRegisterSuccess');
        this.setState({
            contentComponent: 'hospital',
            currentMenu: 'hospital'
        })
    };

    handleLoginSuccess = (userInfo) => {
        console.log('invoke handleLoginSuccess');
        this.setState({
            contentComponent: 'hospital',
            currentMenu: 'hospital',
            userInfo: userInfo,
            isLogin: true
        })
    };

    handleForgetPassword = () => {
        console.log('invoke handleForgetPassword');
        this.setState({
            contentComponent: 'forgot',
            currentMenu: 'forgot'
        })
    };

    handleForgotSuccess = () => {
        console.log('invoke handleForgotSuccess');
        this.handleLogin();
    };

    handleLogout = () => {
        console.log('invoke handleLogout');
        this.setState({
            contentComponent: 'hospital',
            currentMenu: 'hospital',
            isLogin: false,
            userInfo: {},
            userType: 'user'
        })
    };

    enterPersonalCenter = () => {
        console.log('invoke enterPersonalCenter');
        this.setState({
            contentComponent: 'personal',
            currentMenu: 'personal'
        })
    };

    handleDoAppointment = () => {
        this.setState({
            contentComponent: 'appointment',
            currentMenu: 'appointment'
        });
    };

    setCurrentHospital = (data) => {
        console.log('App set current hospital:' + data);
        this.setState({
            currentHospital: data
        })
    };

    saveCurrentDepartment = (data) => {
        console.log('App set current department:' + data);
        this.setState({
            currentDepartment: data
        })
    };

    handleSearch = () => {
        console.log('触发搜索');
        console.log(this.state);
        this.setState({
            contentComponent: 'search',
            currentMenu: 'search',
            searchEnable: true
        })
    };

    handleSelectChange = (value) => {
        console.log(value);
        this.setState({
            searchType: value,
            searchEnable: true
        })
    };

    searchChange = (e) => {
        console.log('onchange' + e.target.value);
        this.setState({
            searchContent: e.target.value
        })
    };

    setUserType = (type) => {
        this.setState({
            userType: type
        })
    };

    saveCurrentDoctor = (data) => {
        this.setState({
            currentDoctor: data
        })
    }

}

export default App;
