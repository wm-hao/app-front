import React from 'react';
import {Modal, Button} from 'antd';

class UserInfoUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title="修改面板"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.props.name}</p>
                </Modal>
                <Button onClick={this.handleClick} type={'primary'}>修改</Button>
            </div>
        )
    }

    handleClick = () => {
        this.setState({
            visible: true
            }
        )
    };

    handleOk = () => {
        this.setState({
            visible: false
        })
    };

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
}

export default UserInfoUpdate;