import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { changeAttribute, submit } from '../actions/login';
import { push } from 'react-router-redux';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onChangeAttribute: event => {
        dispatch(changeAttribute(event.target.name, event.target.value));
    },
    onSingUpClick: () => dispatch(push('/')),
    onSubmit: ({ name, password }) => {
        dispatch(submit());
        fetch('/api/session/', {
            method: 'POST',
            body: JSON.stringify({ name, password })
        })
            .then(response => response.json())
            .then(data => dispatch(changeAttribute('errors', data.errors)));
    }
});

const mapStateToProps = ({ login }) => login;

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Login extends Component {
    static propTypes = {
        onChangeAttribute: PropTypes.func,
        onSingUpClick: PropTypes.func,
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        email: PropTypes.string,
        password: PropTypes.string,
        errors: PropTypes.object
    };

    static contextTypes = {
        history: PropTypes.object
    };

    render() {
        const {
            onChangeAttribute,
            onSubmit,
            disabled,
            email,
            password,
            errors
        } = this.props;

        return <PageContent>
            <h1>Login</h1>
            <TextField
                hintText='Email'
                onChange={onChangeAttribute}
                name='email'
                value={email}
                errorText={errors.email}
                style={style}
            />
            <br/>
            <TextField
                hintText='Password'
                onChange={onChangeAttribute}
                name='password'
                value={password}
                errorText={errors.password}
                style={style}
            />
            <br/>
            <FlatButton
                label='Go!'
                onClick={() => onSubmit({ email, password })}
                disabled={disabled}
            />
            <FlatButton
                label='Sign up'
                onClick={this.props.onSingUpClick}
                disabled={disabled}
            />
        </PageContent>;
    }
}
