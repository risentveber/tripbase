import {
    CURRENT_USER_ATTRIBUTE_CHANGE
} from '../actions/currentUser';
import { LOGIN_AUTHENTIFICATED } from '../actions/login';

const defaultLayoutState = () => ({
    authentificated: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    session_hash: '',
    errors: {}
});

export default (state = defaultLayoutState(), action) => {
    switch (action.type) {
        case CURRENT_USER_ATTRIBUTE_CHANGE:
            return {
                ...state,
                [action.attribute]: action.value
            };
        case LOGIN_AUTHENTIFICATED:
            return {
                ...state,
                authentificated: true
            };
        default:
            return state;
    }
};
