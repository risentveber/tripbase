import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import ContentSend from 'material-ui/svg-icons/content/send';
import ListIcon from 'material-ui/svg-icons/action/list';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import LoginIcon from 'material-ui/svg-icons/action/perm-identity';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import { Subheader } from 'material-ui';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/login';
import { push } from 'react-router-redux';
import destroy from '../services/session/destroy';

@connect(
    ({ currentUser: { authentificated } }) => ({ authentificated }),
    dispatch => ({
        onLogoutClick: () =>
            destroy().then(
                () => dispatch(logout()) && dispatch(push('/login/'))
            )
    })
)
export default class Menu extends Component {
    static propTypes = {
        authentificated: PropTypes.bool,
        onLogoutClick: PropTypes.func
    };

    render() {
        const { authentificated } = this.props;

        return <List>
            <Subheader>Menu</Subheader>
            {!authentificated && <Link to='/login/'>
                <ListItem primaryText='Login' leftIcon={<LoginIcon />} />
            </Link>
            }
            {!authentificated && <Link to='/signup/'>
                <ListItem primaryText='Sign up' leftIcon={<ContentSend />} />
            </Link>}
            {authentificated && <Link to='/profile/'>
                <ListItem primaryText='Profile' leftIcon={<ProfileIcon />} />
            </Link>}
            {authentificated && <Link to='/times/'>
                <ListItem primaryText='Time entries' leftIcon={<ListIcon />} />
            </Link>}
            {authentificated && <Link to='/times/new/'>
                <ListItem primaryText='Add time entry' leftIcon={<AddIcon />} />
            </Link>}
            {authentificated && <ListItem
                primaryText='Logout'
                onClick={this.props.onLogoutClick}
                leftIcon={<LogoutIcon />}
            />}
        </List>;
    }
}
