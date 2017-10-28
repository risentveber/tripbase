import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { changeCurrentUserAttribute, userStartCreation } from '../actions/currentUser';
import createUser from '../services/users/create';


const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onChangeAttribute: event => {
        dispatch(changeCurrentUserAttribute(event.target.name, event.target.value));
    },
    onSingUpClick: () => dispatch(push('/')),
    onSubmit: ({ name, password, password_confirmation, email }) => {
        dispatch(userStartCreation());
        createUser({ name, password, password_confirmation, email })
            .then(() => dispatch(push('/login/')))
            .catch(errors => dispatch(changeCurrentUserAttribute('errors', errors)));
    }
});

const mapStateToProps = ({ currentUser }) => currentUser;

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
        name: PropTypes.string,
        password: PropTypes.string,
        password_confirmation: PropTypes.string,
        errors: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object
    };

    render() {
        const {
            onChangeAttribute,
            onSubmit,
            disabled,
            email,
            password,
            errors,
            name,
            password_confirmation: passwordConfirmation
        } = this.props;

        return <PageContent>
            <h1>Welcome</h1>
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
                hintText='Name'
                onChange={onChangeAttribute}
                name='name'
                value={name}
                errorText={errors.name}
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
            <TextField
                hintText='Password confirmation'
                onChange={onChangeAttribute}
                name='password_confirmation'
                type='password'
                value={passwordConfirmation}
                errorText={errors.password_confirmation}
                style={style}
            />
            <br/>
            <RaisedButton
                label='Continue'
                primary
                onClick={() => onSubmit(this.props)}
                disabled={disabled}
            />
            <Link to='/login/'>
                <RaisedButton
                    label='Login'
                />
            </Link>
        </PageContent>;
    }
}
