import {
    LAYOUT_MENU_TOGGL
} from '../actions/laoyut';

const defaultLayoutState = () => ({
    menuIsOpen: JSON.parse(localStorage.getItem('menuIsOpen') || 'false')
});

export default (state = defaultLayoutState(), action) => {
    switch (action.type) {
        case LAYOUT_MENU_TOGGL:
            localStorage.setItem('menuIsOpen', !state.menuIsOpen);
            return {
                menuIsOpen: !state.menuIsOpen
            };
        default:
            return state;
    }
};
