import React from 'react';
import {List} from 'antd';
import axios from 'axios';
import {GetUserInfoInList, ServerUrl} from "./Constants";
import UserInfoUpdate from "./UserInfoUpdate";
import '../App.css';

class UserInfoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    render() {
        return (
            <List
                dataSource={this.state.dataSource}
                grid={{column: 2}}
                renderItem={item => (
                    <List.Item actions={[<UserInfoUpdate name={item.name} value={item.content}/>]}>
                        <List.Item.Meta
                            title={item.name}
                        />
                        <div>{item.content}</div>
                    </List.Item>
                )}
            />

        )
    }

    componentDidMount() {
        const self = this;
        const props = this.props;
        axios.post(ServerUrl + GetUserInfoInList, {
            phoneNumber: props.userInfo.phoneNumber
        }).then(function (response) {
            console.log(response.data);
            self.saveConvertedUserInfo(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    saveConvertedUserInfo = (data) => {
        this.setState({
            dataSource: data
        })
    }

}

export default UserInfoForm;