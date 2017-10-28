import {
    TRIP_CREATED,
    TRIPS_LOADED,
    TRIP_SELECT,
    TRIP_DELETE,
    TRIP_ATTRIBUTE_CHANGED
} from '../actions/trips';

const defaultLoginState = () => ({
    list: [],
    selected: {
        errors: {}
    }
});

export default (state = defaultLoginState(), action) => {
    switch (action.type) {
        case TRIP_CREATED:
            return {
                list: state.list.concat(action.trip),
                selected: {
                    errors: {}
                }
            };
        case TRIP_DELETE:
            return {
                list: state.list.filter(t => t.id !== action.id),
                selected: {
                    errors: {}
                }
            };
        case TRIPS_LOADED:
            return {
                list: action.trips,
                selected: {
                    errors: {}
                }
            };
        case TRIP_SELECT:
            return {
                list: state.list,
                selected: {
                    ...action.trip,
                    start_date: new Date(action.trip.start_date),
                    end_date: new Date(action.trip.end_date),
                    errors: {}
                }
            };
        case TRIP_ATTRIBUTE_CHANGED:
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
