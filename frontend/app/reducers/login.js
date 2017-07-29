import {
    LOGIN_ATTRIBUTE_CHANGE,
    LOGIN_SUBMIT
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
        case LOGIN_SUBMIT:
            return {
                ...state,
                processing: true
            };
        default:
            return state;
    }
};
