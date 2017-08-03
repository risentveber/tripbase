import React, { Component } from 'react';
import auth from '../decorators/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@auth
@connect(({ currentUser }) => ({ ...currentUser }))
export default class Profile extends Component {
    static propTypes = {
        name: PropTypes.string,
        email: PropTypes.string
    };

    render() {
        return <div>
            <h1>Profile</h1>
            <h3>{this.props.email}</h3>
            <h3>{this.props.name}</h3>
        </div>;
    }
}
