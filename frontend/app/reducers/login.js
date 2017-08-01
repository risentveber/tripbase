import {
    LOGIN_ATTRIBUTE_CHANGE,
    LOGIN_AUTHENTIFICATED,
    LOGIN_SUBMIT,
    LOGIN_FAILED,
    LOGOUT
} from '../actions/login';

const defaultLoginState = () => ({
    email: '',
    password: '',
    disabled: false,
    errors: {}
});

export default (state = defaultLoginState(), action) => {
    switch (action.type) {
        case LOGIN_ATTRIBUTE_CHANGE:
            return {
                ...state,
                [action.attribute]: action.value
            };
        case LOGOUT:
            return defaultLoginState();
        case LOGIN_SUBMIT:
            return {
                ...state,
                processing: true
            };
        case LOGIN_FAILED:
            return {
                ...state,
                errors: action.errors,
                processing: false
            };
        case LOGIN_AUTHENTIFICATED:
            return {
                ...state,
                processing: false,
                email: '',
                errors: {},
                password: ''
            };
        default:
            return state;
    }
};
