import {Modal} from 'antd';

export const ServerUrl = 'http://localhost:8080/';
export const UserAdd = 'user/add';
export const UserValidate = 'user/validateLogin';
export const UserLogin = 'user/selectByPhoneNumber';
export const UserSendValidateCode = 'user/getValidateCode';
export const UserResolveForgot = 'user/resolveForgotPassword';
export const RecordQryByUserCode = 'record/selectByUserCode';
export const RecordQryByDoctorCode = 'record/selectByDoctorCode';
export const RecordAdd = 'record/add';
export const GetAllRecord = 'record/selectAll';
export const UpdateRecord = 'record/update';
export const DeleteRecord = 'record/deleteByIdcard';
export const GetUserInfoInList = 'user/getUserInfoInList';
export const GetUserInfoByIdCard = "user/selectUserInfoByIdCard";
export const UpdateUserByColumn = "user/updateUserByColumn";
export const ValidatePassword = "user/validatePassword";
export const EvaluationAdd = "evaluation/add";
export const GetHospitalsByDepart = "departHospitalRel/selectByDepartmentCode";
export const GetDepartsByHospital = "departHospitalRel/selectByHospitalCode";
export const GetHospitalsByArea = "hospital/selectByArea";
export const GetHospitalsByLevel = "hospital/selectByLevel";
export const GetHospitalsByName = "hospital/selectByName";
export const GetHospitalsAll = "hospital/selectAll";
export const GetHospitalByCode = "hospital/selectByCode";
export const GetDepartmentAll = "department/selectAll";
export const GetDepartmentByCode = "department/selectByCode";
export const GetDepartmentByName = "department/selectByName";
export const GetStaticDataLevels = "sdlevel/selectAll";
export const GetStaticDataLevelByCode = "sdlevel/selectByCode";
export const GetStaticDataArea = "sdArea/selectAll";
export const GetAvator = "http://localhost:8080/assets/img/";

export const DoctorAdd = 'doctor/add';
export const DoctorGetDoctorInfoInList = 'doctor/getDoctorInfoInList';
export const DoctoresolveForgotPasswordR= 'doctor/resolveForgotPassword';
export const DoctorSelectByIdCard = 'doctor/selectByIdCard';
export const DoctorLogin = 'doctor/selectByPhoneNumber';
export const DoctorUpdateDoctorByColumn = 'doctor/updateDoctorByColumn';
export const DoctorValidatePassword = 'doctor/validatePassword';
export const DoctorValidateLogin = 'doctor/validateLogin';
export const UpdateDoctor = 'doctor/update';
export const DeleteDoctor = 'doctor/deleteByIdcard';
export const GetAllDoctors = 'doctor/selectAll';

export const AdminAdd = 'admin/add';
export const AdminGetAdminInfoInList = 'admin/getAdminInfoInList';
export const AdminesolveForgotPasswordR= 'admin/resolveForgotPassword';
export const AdminSelectByIdCard = 'admin/selectByIdCard';
export const AdminValidteLogin = 'admin/validateLogin';
export const AdminSelectByPhoneNumber = 'admin/selectByPhoneNumber';
export const AdminUpdateAdminByColumn = 'admin/updateAdminByColumn';
export const AdminValidatePassword = 'admin/validatePassword';
export const GetAllUser = 'user/selectAll';
export const UpdateAllUser = 'user/updateAll';
export const UpdateUser = 'user/update';
export const DeleteUser = 'user/deleteByIdcard';

export const ScheduleAdd = 'schedule/add';
export const ScheduleDelete = 'schedule/delete';
export const ScheduleUpdate = 'schedule/update';
export const ScheduleSelectAll = 'schedule/selectAll';
export const GetDoctorImage = 'http://localhost:8080/assets/img/';


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

export function convertLevel(code) {
    if ('301' === code) {
        return '三级甲等';
    }
    if ('302' === code) {
        return '三级乙等';
    }
    if ('303' === code) {
        return '三级丙等';
    }
    if ('201' === code) {
        return '二级甲等';
    }
    if ('202' === code) {
        return '二级乙等';
    }
    if ('203' === code) {
        return '二级丙等';
    }
    if ('101' === code) {
        return '一级甲等';
    }
    if ('102' === code) {
        return '一级乙等';
    }
    if ('103' === code) {
        return '一级丙等';
    }
}

export function convertDepartment(code) {
    if('SJW001' === code){
        return '神经外科';
    }
    if('F001' === code){
        return '妇科';
    }
    if('EK001' === code){
        return '儿科';
    }
    if('GK001' === code){
        return '骨科';
    }
    if('YK001' === code){
        return '眼科';
    }
    if('KQK001' === code){
        return '口腔科';
    }
    if('PFK001' === code){
        return '皮肤科';
    }
    if('EBH001' === code){
        return '耳鼻喉科';
    }
}

