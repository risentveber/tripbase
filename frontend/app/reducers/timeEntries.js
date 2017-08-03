import {

} from '../actions/timeEntries';
import { TIME_ENTRY_UPDATE } from '../actions/timeEntries';

const defaultLoginState = () => ({
    list: [],
    selected: {}
});

export default (state = defaultLoginState(), action) => {
    switch (action.type) {
        case TIME_ENTRY_UPDATE:
            return {
                ...state,
                [action.attribute]: action.value
            };
        default:
            return state;
    }
};
