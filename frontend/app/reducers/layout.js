import {
    LAYOUT_MENU_TOGGL
} from '../actions/laoyut';

const defaultLayoutState = () => ({
    menuIsOpen: false
});

export default (state = defaultLayoutState(), action) => {
    switch (action.type) {
        case LAYOUT_MENU_TOGGL:
            return {
                menuIsOpen: !state.menuIsOpen
            };
        default:
            return state;
    }
};
