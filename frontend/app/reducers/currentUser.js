import { LOGIN_AUTHENTIFICATED, LOGOUT } from '../actions/login';

const defaultLayoutState = () => ({
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
        case LOGIN_AUTHENTIFICATED:
            return {
                ...state,
                ...action.user
            };
        case LOGOUT:
            return defaultLayoutState();
        default:
            return state;
    }
};
