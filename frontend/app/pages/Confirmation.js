import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import confirm from '../services/confirmation';
import { setBottomMessage } from '../actions/laoyut';

@connect(
    null,
    dispatch => ({
        confirmEmailByToken: confirmationId => {
            confirm({ confirmationId }).then(
                () => dispatch(setBottomMessage('Successfully confirmed')),
                () => dispatch(setBottomMessage('Confirmation error')),
            ).then(() => dispatch(push('/login/')));
        },
    })
)
export default class Confirmation extends Component {
    static propTypes = {
        match: PropTypes.object,
        confirmEmailByToken: PropTypes.func
    };

    componentDidMount() {
        const { confirmationId }  = this.props.match.params;

        this.props.confirmEmailByToken(confirmationId);
    }

    render() {
        return <div>
            <h1>Waiting for confirmation...</h1>
        </div>;
    }
}
