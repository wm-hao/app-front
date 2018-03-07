import React, {Component} from 'react';
import {Col, Form, Icon, Input, Menu, Row, Select} from 'antd';
import './App.css';
import Logo from './assets/img/logo.jpg';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import PersonalCenter from "./components/PersonalCenter";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentComponent: 'hospital',
            currentMenu: 'hospital',
            userInfo: {},
            isLogin: false
        }
    }

    componentWillMount() {
        console.log('willMount');
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
                    <Menu.Item key="forgot">
                        找回密码
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
                        欢迎您,{this.state.userInfo.name}&nbsp;&nbsp;<a href={'#/login'}
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
            WrappedForm = Form.create()(RegisterForm);
            ContentComponent = <WrappedForm handleRegisterSuccess={this.handleRegisterSuccess}/>;
            MenuComponent = this.renderRegisterMenu();
        } else if ('login' === contentComponentName) {
            WrappedForm = Form.create()(LoginForm);
            ContentComponent = <WrappedForm handleForgetPassword={this.handleForgetPassword}
                                            handleLoginSuccess={this.handleLoginSuccess}/>;
            MenuComponent = this.renderLoginMenu();
        } else if ('personal' === contentComponentName) {
            ContentComponent = <PersonalCenter/>;
            MenuComponent = this.renderPersonalMenu();
        } else if ('forgot' === contentComponentName) {
            WrappedForm = Form.create()(ForgotPasswordForm);
            ContentComponent = <WrappedForm handleForgotSuccess={this.handleForgotSuccess}/>;
            MenuComponent = this.renderForgotMenu();
        } else {
            ContentComponent = <h1>home</h1>;
            MenuComponent = this.renderIndexMenu();
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
                        < div style={{textAlign: 'right', marginTop: '8%'}}>
                            <Input.Group compact>
                                < Select defaultValue={'医院'}>
                                    <Select.Option value="hospital">医院</Select.Option>
                                    <Select.Option value="department">科室</Select.Option>
                                </Select>
                                <Input.Search style={{width: '60%'}} defaultValue="" placeholder={"请输入搜索关键字"}
                                              enterButton/>
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

    componentDidMount() {
        console.log('didMount');
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log('update');
        console.log(this.state);
    }

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
            currentMenu: clickParams.key
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
            isLogin: false
        })
    };

    enterPersonalCenter = () => {
        console.log('invoke enterPersonalCenter');
        this.setState({
            contentComponent: 'personal',
            currentMenu: 'personal'
        })
    }

}

export default App;
