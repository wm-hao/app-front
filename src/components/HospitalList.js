import React from 'react';
import {List, Icon, Button} from 'antd';
import {convertLevel, GetAvator, info, warning} from "./Constants";

const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无医院信息',
};

class HospitalList extends React.Component {

    render() {
        return (
            <div>
            <List
                locale={locale}
                dataSource={this.props.hospitals}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <div style={{width: 1100, height: 152, display: 'inline'}}>
                            <div style={{width: 202, height: 150, margin: '1px 0', float: 'left'}}>
                                <img src={GetAvator + item.image} alt={item.name}/>
                            </div>
                            <div style={{width: 700, height: 152, float: 'left'}}>
                                <div style={{height: 40}}>
                                </div>
                                <div style={{height: 72}}>
                                    <div style={{margin: 4}}>{item.name}&nbsp;&nbsp;{convertLevel(item.level)}</div>
                                    <div style={{margin: 4}}><Icon type={'phone'}/>&nbsp;{item.phone}</div>
                                    <div style={{margin: 4}}><Icon type={'environment'}/>&nbsp;{item.address}</div>
                                </div>
                            </div>
                            <div style={{width: 100, height: 152, float: 'left',marginTop: 60}}>
                                    <WrappedButton handleClick={this.handleClick} hospitalCode={item.code}/>
                            </div>
                        </div>
                    </List.Item>)}
            />
            </div>
        )
    }

    handleClick = (data) => {
        const props = this.props;
        console.log('currentHospital code:' + data);
        console.log('props.userType ==' +  props.userType);
        if(props.userType !== 'user') {
            warning('警告面板', '当前用户非普通用户，不能预约');
            return;
        }
        if(!props.isLogin) {
            info('通知面板', '预约需要登录，请您新登录！');
            props.handleLogin();
        }else{
            props.setCurrentHospital(data);
            props.handleDoAppointment();
        }
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
        props.handleClick(props.hospitalCode);
    }
}

export default HospitalList;