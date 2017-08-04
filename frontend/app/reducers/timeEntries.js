import {
    TIME_ENTRY_CREATED,
    TIME_ENTRIES_LOADED,
    TIME_ENTRY_ATTRIBUTE_CHANGED
} from '../actions/timeEntries';

const defaultLoginState = () => ({
    list: [],
    selected: {
        errors: {}
    }
});

export default (state = defaultLoginState(), action) => {
    switch (action.type) {
        case TIME_ENTRY_CREATED:
            return {
                list: state.list.concat(action.timeEntry),
                selected: {
                    errors: {}
                }
            };
        case TIME_ENTRIES_LOADED:
            return {
                list: action.timeEntries,
                selected: {
                    errors: {}
                }
            };
        case TIME_ENTRY_ATTRIBUTE_CHANGED:
            console.log(action.attr, action.value);
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
