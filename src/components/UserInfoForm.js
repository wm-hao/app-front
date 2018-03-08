import React from 'react';
import {List, Input} from 'antd';
import axios from 'axios';
import {GetUserInfoInList, ServerUrl} from "./Constants";

class UserInfoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource : []
        }
    }

    render() {
        return (
            <List
                // className="demo-loadmore-list"
                // loading={loading}
                // itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={this.state.dataSource}
                renderItem={item => (
                    <List.Item actions={[<a>修改</a>, <a>提交</a>]}>
                        <List.Item.Meta
                            title={item.name}
                        />
                        <div>{item.content}</div>
                        <Input />
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