import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelect from '../../component/avatar-select/avatarselect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(state => state.user, { update })
export default class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            company: '',
            desc: '',
            money: '',
            title: ''
        }
    }
    onHandler(key, val) {
        this.setState({
            [key]: val
        });
    }
    updateBossInfo() {
        this.props.update(this.state);
    }
    render() {
        const pathName = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;

        return <div>
            {redirectTo && redirectTo !== pathName ? <Redirect to={this.props.redirectTo}></Redirect> :
                <React.Fragment>
                    <NavBar mode="dark">Boss完善信息页面</NavBar>
                    <AvatarSelect selectAvatar={(avatar) => {
                        this.setState({ avatar: avatar.text });
                    }} />
                    <List renderHeader={() => '招聘信息'}>
                        <InputItem onChange={(v) => { this.onHandler('company', v) }} clear>公司名称</InputItem>
                        <InputItem onChange={(v) => { this.onHandler('title', v) }} clear>招聘职位</InputItem>
                        <InputItem onChange={(v) => { this.onHandler('money', v) }} clear>薪资范围</InputItem>
                        <TextareaItem rows={3} onChange={(v) => { this.onHandler('desc', v) }} title='职位要求' clear></TextareaItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.updateBossInfo.bind(this)}>保存</Button>
                </React.Fragment>
            }
        </div>
    }
}