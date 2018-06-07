import React from 'react';
import Logo from '../../component/logo/logo'
import { Button, WingBlank, WhiteSpace, List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { login })
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
    }
    handler(key, val) {
        this.setState({
            [key]: val
        });
    }
    login() {
        this.props.login(this.state);
    }
    register() {
        this.props.history.push('/register');
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>登陆页面</h2>
                <WingBlank>
                    <div className="error-msg">{this.props.msg}</div>
                    <List>
                        <InputItem clear onChange={(val) => { this.handler('user', val) }}>用户</InputItem>
                        <InputItem type="password" clear onChange={(val) => { this.handler('pwd', val) }}>密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.login.bind(this)} >登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={() => { this.register() }} >注册</Button>
                </WingBlank>
            </div>
        );
    }
}