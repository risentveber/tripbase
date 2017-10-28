import {
    CURRENT_USER_ATTRIBUTE_CHANGE
} from '../actions/currentUser';
import { LOGIN_AUTHENTIFICATED, LOGOUT } from '../actions/login';

const defaultLayoutState = () => ({
    authentificated: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    session_hash: '',
    role: 'anonymous',
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
                email: action.user.email || state.email,
                name: action.user.name || state.name,
                role: action.user.role || state.role,
                authentificated: true
            };
        case LOGOUT:
            return defaultLayoutState();
        default:
            return state;
    }
};
