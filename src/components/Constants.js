import {Modal} from 'antd';
export const ServerUrl = 'http://localhost:8080/';
export const UserAdd = 'user/add';
export const UserValidate = 'user/validateLogin';
export const UserLogin = 'user/selectByPhoneNumber';
export const UserSendValidateCode = 'user/getValidateCode';
export const UserResolveForgot = 'user/resolveForgotPassword';
export const RecordQryByPhoneNumber = 'record/selectByUserCode';
export const GetUserInfoInList = 'user/getUserInfoInList';


export function info(title, content) {
    Modal.info({
        title: title,
        content: content
    });
}

export function success(title, content) {
    Modal.success({
        title: title,
        content: content
    });
}

export function fail(title, content) {
    Modal.error({
        title: title,
        content: content
    });
}

export function warning(title, content) {
    Modal.warning({
        title: title,
        content: content
    });
}