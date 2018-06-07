import axios from 'axios';
import { getRedirectPath } from '../util';

const ActionType = {
    ERR_MSG: 'ERR_MSG',
    RESGISTER_SUCCESS: 'RESGISTER_SUCCESS',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOAD_DATA: 'LOAD_DATA',
    AUTH_SUCCESS: 'AUTH_SUCCESS'
}

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case ActionType.ERR_MSG:
            return { ...state, isAuth: false, msg: action.msg };
        case ActionType.AUTH_SUCCESS:
            console.log(action.payLoad);
            return { ...state, redirectTo: getRedirectPath(action.payLoad), ...action.payLoad }
        case ActionType.LOAD_DATA:
            return { ...state, isAuth: true, redirectTo: getRedirectPath(action.payLoad), ...action.payLoad }
        default:
            return state;
    }
}

function errMsg(msg) {
    return { msg, type: ActionType.ERR_MSG }
}

function updateSuccess(data) {
    return { type: ActionType.AUTH_SUCCESS, payLoad: data };
}


export function register({ user, pwd, confirmPwd, type }) {
    if (!user || !pwd || !type) {
        return errMsg('用户名和密码为必填项！');
    } else if (pwd !== confirmPwd) {
        return errMsg('两次输入密码不一致！');
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(updateSuccess(res.data.data));
            } else {
                dispatch(errMsg(res.data.data.msg));
            }
        });
    }
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errMsg('用户名和密码不能为空！');
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(function (res) {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(updateSuccess(res.data.data));
            } else {
                dispatch(errMsg(res.data.msg));
            }
        });
    }
}

export function loadData(data) {
    return { type: ActionType.LOAD_DATA, payLoad: data }
}

export function update(body) {
    return dispatch => {
        axios.post('/user/update', body).then(function (res) {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(updateSuccess(res.data.data));
            } else {
                dispatch(errMsg(res.data.msg));
            }
        });
    }
}














