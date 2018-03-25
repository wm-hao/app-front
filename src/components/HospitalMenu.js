import React from 'react';
import {Row} from 'antd';
import ConditionList from "./ConditionList";
import {
    GetStaticDataLevels, GetStaticDataArea, ServerUrl, GetHospitalsAll, GetHospitalsByArea,
    GetHospitalsByLevel, GetHospitalsByDepart, GetDepartmentAll, GetHospitalsByName
} from "./Constants";
import axios from 'axios';
import HospitalList from "./HospitalList";

class HospitalMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: []
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.isByDepartment
                        ? <Row>
                            <ConditionList url={GetDepartmentAll} title={'科室名称'} filter={this.handleFilter}
                                           type={'department'}/>
                        </Row>
                        :
                        (
                            <div>
                                <Row>
                                    <ConditionList url={GetStaticDataLevels} title={'医院等级'} filter={this.handleFilter}
                                                   type={'level'}/>
                                </Row>
                                <Row>
                                    <ConditionList url={GetStaticDataArea} title={'医院地区'} filter={this.handleFilter}
                                                   type={'area'}/>
                                </Row>
                            </div>
                        )
                }
                <Row>
                    <HospitalList hospitals={this.state.hospitals} isLogin={this.props.isLogin} userType={this.props.userType}
                                  handleLogin={this.handleLogin} setCurrentHospital={this.setCurrentHospital}
                                  handleDoAppointment={this.handleDoAppointment}/>
                </Row>

            </div>
        )
    }

    componentDidMount() {
        const props = this.props;
        console.log('hospital menu :' + props.searchContent + '-----' + props.searchEnable);
        if (props.searchEnable && 'hospital' === props.searchType) {
            this.fetchData(ServerUrl + GetHospitalsByName, {name: props.searchContent});
        } else {
            this.fetchData(ServerUrl + GetHospitalsAll, {});
        }
    }

    saveHospitals = (data) => {
        this.setState({
            hospitals: data
        })
    };

    handleFilter = (filter) => {
        console.log('currentDepartment code:' + filter.value);
        if ('area' === filter.key) {
            this.fetchData(ServerUrl + GetHospitalsByArea, {
                area: filter.value
            });
        }
        if ('level' === filter.key) {
            this.fetchData(ServerUrl + GetHospitalsByLevel, {
                level: filter.value
            });
        }
        if ('department' === filter.key) {
            this.fetchData(ServerUrl + GetHospitalsByDepart, {
                departmentCode: filter.value
            });
            this.saveDepartmentCode(filter.value);
        }
    };

    fetchData = (url, params) => {
        const self = this;
        axios.post(url, params).then(function (response) {
            console.log(response.data);
            self.saveHospitals(response.data);
        }).catch(function (error) {
            console.error(error);
        })
    };

    handleDoAppointment = () => {
        this.props.handleDoAppointment();
    };

    handleLogin = () => {
        const props = this.props;
        console.log('handle login hospital menu');
        props.handleUnLogin();
    };

    setCurrentHospital = (data) => {
        this.props.setCurrentHospital(data);
    };

    saveDepartmentCode = (data) => {
        this.props.saveCurrentDepartment(data);
    }
}

export default HospitalMenu;