import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import ContentSend from 'material-ui/svg-icons/content/send';
import ListIcon from 'material-ui/svg-icons/action/list';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import AssessmentIcon from 'material-ui/svg-icons/action/assessment';
import LoginIcon from 'material-ui/svg-icons/action/perm-identity';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import { Subheader } from 'material-ui';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/login';
import { push } from 'react-router-redux';
import destroy from '../services/session/destroy';

@connect(
    ({ currentUser: { role } }) => ({ role }),
    dispatch => ({
        onLogoutClick: () =>
            destroy().then(
                () => dispatch(logout()) && dispatch(push('/login/'))
            )
    })
)
export default class Menu extends Component {
    static propTypes = {
        role: PropTypes.string,
        onLogoutClick: PropTypes.func
    };

    render() {
        const { role } = this.props;
        const authentificated = role !== 'anonymous';
        const isAdmin = role === 'admin';
        const isManager = role === 'manager';

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
            {(isAdmin || isManager) && <Link to='/users/'>
                <ListItem primaryText='Users' leftIcon={<ListIcon />} />
            </Link>}
            {authentificated && <Link to='/travel_plan/'>
                <ListItem primaryText='Travel plan' leftIcon={<AssessmentIcon />} />
            </Link>}
            {authentificated && <Link to='/trips/'>
                <ListItem primaryText='My trips' leftIcon={<ListIcon />} />
            </Link>}
            {authentificated && <Link to='/trips/new/'>
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
