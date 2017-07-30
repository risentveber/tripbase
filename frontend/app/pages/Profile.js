import React, { Component } from 'react';
import auth from '../decorators/auth';

@auth
export default class Profile extends Component {
    render() {
        return <div>
            <h1>User profile</h1>
            <p>
                Something valuable for current user
            </p>
        </div>;
    }
}
