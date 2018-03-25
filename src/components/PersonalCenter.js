import React from 'react';
import UserCenter from "./UserCenter";
import DoctorCenter from "./DoctorCenter";
import AdminCenter from "./AdminCenter";


class PersonalCenter extends React.Component {

    render() {
        return (
            <div>
                {this.props.userType === 'user'
                    ? <UserCenter userInfo={this.props.userInfo} userType={this.props.userType}/>
                    : (this.props.userType === 'doctor' ?
                        <DoctorCenter userInfo={this.props.userInfo} userType={this.props.userType}/> : this.props.userType === 'admin' ?
                            <AdminCenter userInfo={this.props.userInfo} userType={this.props.userType}/> : '未知错误')
                }
            </div>
        )
    }
}

export default PersonalCenter;