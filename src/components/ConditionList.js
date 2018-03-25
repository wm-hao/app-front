import React from 'react';
import {List, Row, Col } from 'antd';
import axios from 'axios';
import {ServerUrl} from "./Constants";

const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无数据',
};
class ConditionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: []
        }
    }

    render() {
        return (
            <Row>
                <Col span={2}>
                   <p style={{fontSize: 14}}>{this.props.title}</p>
                </Col>
                <Col offset={2}>
                    <List
                        locale={locale}
                        grid={{column: 9}}
                        dataSource={this.state.levels}
                        renderItem={(item) => (
                            <List.Item>
                                <SelfButton onChange={this.handleChange} item={item}/>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        )
    }

    componentDidMount() {
        const self = this;
        const props = this.props;
        axios.post(ServerUrl + props.url,{

        }).then(function (response) {
            console.log(response.data);
            self.saveLevels(response.data);
        })
    }

    handleChange = (item) => {
        console.log(item.code);
        const props = this.props;
        props.filter({
            key: props.type,
            value: item.code
        })
    };

    saveLevels = (data) => {
        this.setState({
            levels: data
        })
    }
}

class SelfButton extends React.Component {
    render() {
        const item = this.props.item;
        return (
            <div>
                <a href={'#/' + item.code} onClick={this.handleClick}>{item.name}</a>
            </div>
        )
    }

    handleClick = () => {
        const item = this.props.item;
        this.props.onChange(item);
    }
}
export default ConditionList;