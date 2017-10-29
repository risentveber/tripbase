import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RaisedButton, TextField } from 'material-ui';
import PageContent from '../components/PageContent';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { changeUserAttribute, selectUser, userStartCreation } from '../actions/users';
import createUser from '../services/users/create';
import updateUser from '../services/users/update';
import getUser from '../services/users/show';
import { setBottomMessage } from '../actions/laoyut';
import { athentificated } from '../actions/login';

const style = {
    marginLeft: 20,
};

const mapDispatchToProps = dispatch => ({
    onChangeAttribute: event => {
        dispatch(changeUserAttribute(event.target.name, event.target.value));
    },
    onUserLoad: trip => {
        dispatch(selectUser(trip));
    },
    onUserLoadFail: () => {
        dispatch(setBottomMessage('Not found'));
        dispatch(push('/'));
    },
    onSingUpClick: () => dispatch(push('/')),
    onSubmit: ({ id, name, password, password_confirmation, email, reloadCurrentUser }) => {
        if (!id) {
            dispatch(userStartCreation());
        }
        let promise;

        if (id) {
            promise = updateUser({ id, name, password, password_confirmation, email })
                .then(() => {
                    dispatch(push('/'));
                    if (reloadCurrentUser) {
                        dispatch(athentificated({ name, email }));
                    }
                });
        } else {
            promise = createUser({ id, name, password, password_confirmation, email })
                .then(() => dispatch(push('/login/')));
        }

        promise.catch(errors => dispatch(changeUserAttribute('errors', errors)));
    }
});

const mapStateToProps = ({
    users: { selected },
    currentUser: { id }
}) => ({ ...selected, reloadCurrentUser: id === selected.id });

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class UserForm extends Component {
    static propTypes = {
        onChangeAttribute: PropTypes.func,
        onSingUpClick: PropTypes.func,
        onUserLoad: PropTypes.func,
        onUserLoadFail: PropTypes.func,
        onSubmit: PropTypes.func,
        disabled: PropTypes.bool,
        email: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.number,
        password: PropTypes.string,
        password_confirmation: PropTypes.string,
        match: PropTypes.object,
        errors: PropTypes.object
    };

    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        const { userId }  = this.props.match.params;

        if (userId) {
            getUser(userId).then(this.props.onUserLoad, this.props.onUserLoadFail);
        }
    }

    render() {
        const {
            onChangeAttribute,
            onSubmit,
            disabled,
            email,
            password,
            errors,
            name,
            id,
            password_confirmation: passwordConfirmation
        } = this.props;

        return <PageContent>
            <h1>{id ? 'Edit profile' : 'Welcome'}</h1>
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
                label={id ? 'Update' : 'Continue'}
                primary
                onClick={() => onSubmit(this.props)}
                disabled={disabled}
            />
            {!id && <Link to='/login/'>
                <RaisedButton label='Login' />
            </Link>}
        </PageContent>;
    }
}
