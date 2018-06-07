import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux';

@withRouter
//connect一定要写到widthRouter下面
@connect(null, { loadData })
export default class Authroute extends React.Component {
    componentDidMount() {
        const publicPath = ['/login', '/register'];
        const currentUrl = this.props.location.pathname;
        if (publicPath.includes(currentUrl)) {
            return;
        }
        axios.get('user/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data);
                } else {
                    //如果没登陆则跳转到登陆页面
                    this.props.history.push('/login');
                }
            }
        });
    }

    render() {
        return null;
    }
}