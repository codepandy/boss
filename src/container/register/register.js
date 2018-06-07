import React from 'react';
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
const RadioItem = Radio.RadioItem;


const UserType = {
    BOSS: "BOSS",
    GENIUS: "GENIUS"
}
@connect(state => state.user, { register })
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            confirmPwd: '',
            type: UserType.GENIUS
        }
    }

    checkUserType(type) {
        this.setState({
            type: type
        });
    }
    handler(key, val) {
        this.setState({
            [key]: val
        });
    }
    register = () => {
        this.props.register(this.state);
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>注册页面</h2>
                <WingBlank>
                    <List>
                        <div className="error-msg">{this.props.msg}</div>
                        <InputItem onChange={(val) => { this.handler('user', val) }}>用户</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" onChange={(val) => { this.handler('pwd', val) }}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={(val) => { this.handler('confirmPwd', val) }}>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem checked={this.state.type === UserType.GENIUS} onChange={() => { this.checkUserType(UserType.GENIUS) }}>牛人</RadioItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type === UserType.BOSS} onChange={() => { this.checkUserType(UserType.BOSS) }}>BOSS</RadioItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}