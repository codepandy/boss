import React from 'react';
import { NavBar, List, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { } from '../../redux/user.redux';
import AvatarSelect from '../../component/avatar-select/avatarselect';
import { update } from '../../redux/user.redux'

@connect(state => state.user, { update })
export default class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            avatar: ''
        }
    }
    onHandler(key, val) {
        this.setState({
            [key]: val
        });
    }
    onUpdate() {
        this.props.update(this.state);
    }
    render() {
        return <div>
            <NavBar>个人信息完善</NavBar>
            <AvatarSelect selectAvatar={(ele) => {
                this.setState({
                    avatar: ele.text
                });
            }}></AvatarSelect>
            <List renderHeader={() => { return '信息描述' }}>
                <InputItem onChange={(v) => { this.onHandler('title', v) }}>求职岗位</InputItem>
                <TextareaItem onChange={(v) => { this.onHandler('desc', v) }} title="个人简介"></TextareaItem>
            </List>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={() => {
                this.onUpdate();
            }}>保存</Button>
        </div >
    }
}