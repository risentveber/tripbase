import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { athentificated, changeAttribute, submit, failed } from '../actions/login';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import create from '../services/session/create';
import showUser from '../services/users/show';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onChangeAttribute: event => {
        dispatch(changeAttribute(event.target.name, event.target.value));
    },
    onSingUpClick: () => dispatch(push('/')),
    onSubmit: ({ email, password }) => {
        dispatch(submit());
        create({ email, password })
            .then(({ user_id }) => showUser(user_id))
            .then(user => dispatch(athentificated(user)))
            .then(() => dispatch(push('/profile/')))
            .catch(errors => dispatch(failed(errors))
        );
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
                type='password'
                value={password}
                errorText={errors.password}
                style={style}
            />
            <br/>
            <RaisedButton
                label='Go!'
                primary
                onClick={() => onSubmit({ email, password })}
                disabled={disabled}
            />
            <Link to='/signup/'>
                <RaisedButton
                    label='Sign up'
                />
            </Link>
        </PageContent>;
    }
}
