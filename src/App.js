import React, {Component} from 'react';
import {Icon, Row, Col, Input, Select, Menu, Form} from 'antd';
import './App.css';
import Logo from './assets/img/logo.jpg';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentComponent: 'hospital',
            currentMenu: 'hospital',
        }
    }

    componentWillMount() {
        console.log('willMount');
    }

    renderIndexMenu = () => {
        return(
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


    render() {
        let ContentComponent;
        let MenuComponment;
        let WrappedForm;
        const contentComponentName = this.state.contentComponent;


        if ('register' === contentComponentName) {
            WrappedForm = Form.create()(RegisterForm);
            ContentComponent = <WrappedForm handleRegisterSuccess={this.handleRegisterSuccess}/>;
            MenuComponment = this.renderRegisterMenu();
        } else if('login' === contentComponentName) {
            WrappedForm = Form.create()(LoginForm);
            ContentComponent = <WrappedForm handleForgetPassword={this.handleForgetPassword}/>;
            MenuComponment = this.renderLoginMenu();
        } else  if('personal' === contentComponentName) {
            ContentComponent = <h1>个人中心</h1>;
            MenuComponment = this.renderPersonalMenu();
        } else if('registerSuccess' === contentComponentName) {
            ContentComponent = <h1>注册成功</h1>;
            MenuComponment = this.renderRegisterMenu();
        } else {
            ContentComponent = <h1>home</h1>;
            MenuComponment = this.renderIndexMenu();
        }
        return (
            <div style={{margin: '0 10%'}}>
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
                            {MenuComponment}
                        </div>
                    </Col>
                </Row>
                {ContentComponent}
            </div>
        );
    }

    componentDidMount() {
        console.log('didMount');
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
            contentComponent: 'registerSuccess',
            currentMenu: 'register'
        })
    }

}

export default App;
