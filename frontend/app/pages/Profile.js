import React, { Component } from 'react';
import auth from '../decorators/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

@auth
@connect(({ currentUser }) => ({ ...currentUser }))
export default class Profile extends Component {
    static propTypes = {
        name: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string
    };

    render() {
        return <Paper style={{ margin: 20, padding: 20 }} zDepth={3}>
            <h1>Profile</h1>
            <h3>{this.props.email}</h3>
            <h3>{this.props.name}</h3>
            <h3>{this.props.role}</h3>
        </Paper>;
    }
}
