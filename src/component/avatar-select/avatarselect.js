import React from 'react';
import { List, Grid } from 'antd-mobile';
import PropTypes from 'prop-types'

const imgs = ['boy', 'chaonan', 'chaorennan', 'girl', 'katong', 'zhiyenvsheng', 'nanhai', 'women', 'zuqiu'];

export default class AvatarSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: null,
            text: ''
        };
    }
    render() {
        let avatarList = imgs.map((item, index) => {
            return { icon: require(`../imgs/${item}.jpg`), text: item }
        });

        const selectedAvatar = this.state.icon ? <div>
            <span>已选择头像</span><img style={{ width: '20px' }} src={this.state.icon} alt={this.state.text} />
        </div> : '请选择头像';

        return (<div>
            <List renderHeader={() => selectedAvatar}>
                <Grid data={avatarList} onClick={(el) => {
                    this.setState(el);
                    this.props.selectAvatar(el);
                }} />
            </List>

        </div>)
    }
}

// AvatarSelect.prototype = {
//     selectAvatar: PropTypes.func
// }