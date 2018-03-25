import React from 'react';
import {Button, Icon} from 'antd';
import axios from 'axios';
import {EvaluationAdd, fail, ServerUrl, success} from "./Constants";

class FeedBack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: ''
        }
    }

    render() {
        return (
            <div style={{width: 900, height: 200}}>
                <div style={{height: 150}}>
                    <div style={{float: 'left', width: 750, height: 150}}>
                        <textarea placeholder={'请输入您的意见，我们会根据您的反馈认真改进。'} style={{width: 750, height: 150}}
                                  onChange={this.handleChange} value={this.state.suggestion}>
                        </textarea>
                    </div>
                    <div style={{float: 'right', textAlign: 'center', width: 150, height: 150}}>
                        <Button type={'primary'} onClick={this.handleClick} style={{margin: '30% 0'}}>
                            递交意见
                        </Button>
                    </div>
                </div>
                <div style={{height: 50}}>
                    <p style={{marginTop: 10}}>欢迎您联系客服反馈问题&nbsp;<Icon type="phone"
                                                                      style={{fontSize: 14, color: '#20c6c6'}}/>
                        &nbsp;010-114/116114电话反馈</p>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            suggestion: e.target.value
        })
    };

    handleClick = () => {
        const props = this.props;
        const self = this;
        console.log(this.state.suggestion);
        if(props.userType === 'user') {
            axios.post(ServerUrl + EvaluationAdd, {
                userCode: props.userInfo.userCode,
                content: this.state.suggestion,
                state: 0
            }).then(function (response) {
                if (response.data.result === 'success') {
                    success('通知面板', '谢谢您的意见反馈！');
                    self.resetTextArea();
                } else {
                    fail('错误面板', '抱歉意见反馈失败!');
                }
            }).catch(function (error) {
                console.error(error);
                fail('系统通知面板', '系统出现问题，请联系管理员！');
            });
        }else if(props.userType === 'doctor') {
            axios.post(ServerUrl + EvaluationAdd, {
                doctorCode: props.userInfo.doctorCode,
                content: this.state.suggestion,
                state: 0
            }).then(function (response) {
                if (response.data.result === 'success') {
                    success('通知面板', '谢谢您的意见反馈！');
                    self.resetTextArea();
                } else {
                    fail('错误面板', '抱歉意见反馈失败!');
                }
            }).catch(function (error) {
                console.error(error);
                fail('系统通知面板', '系统出现问题，请联系管理员！');
            });
        }

    };

    resetTextArea = () => {
        this.setState({
            suggestion: ''
        });
    }
}

export default FeedBack;