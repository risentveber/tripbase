import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';

import ContentSend from 'material-ui/svg-icons/content/send';
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
                <ListItem primaryText='Login' leftIcon={<ContentSend />} />
            </Link>
            }
            {!authentificated && <Link to='/signup/'>
                <ListItem primaryText='Sign up' leftIcon={<ContentSend />} />
            </Link>}
            {authentificated && <Link to='/profile/'>
                <ListItem primaryText='Profile' leftIcon={<ContentSend />} />
            </Link>}
            {authentificated && <ListItem
                primaryText='Logout'
                onClick={this.props.onLogoutClick}
                leftIcon={<ContentSend />}
            />}
        </List>;
    }
}
