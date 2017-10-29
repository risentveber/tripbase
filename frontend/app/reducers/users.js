import {
    USER_CREATED,
    USERS_LOADED,
    USER_SELECT,
    USER_DELETE,
    USER_ATTRIBUTE_CHANGED
} from '../actions/users';

const defaultUsersState = () => ({
    list: [],
    selected: {
        errors: {}
    }
});

export default (state = defaultUsersState(), action) => {
    switch (action.type) {
        case USER_CREATED:
            return {
                list: state.list.concat(action.trip),
                selected: {
                    errors: {}
                }
            };
        case USER_DELETE:
            return {
                list: state.list.filter(t => t.id !== action.id),
                selected: {
                    errors: {}
                }
            };
        case USERS_LOADED:
            return {
                list: action.users,
                selected: {
                    errors: {}
                }
            };
        case USER_SELECT:
            return {
                list: state.list,
                selected: {
                    ...action.trip,
                    errors: {}
                }
            };
        case USER_ATTRIBUTE_CHANGED:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    [action.attr]: action.value
                }
            };
        default:
            return state;
    }
};
