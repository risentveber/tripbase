import {
    LAYOUT_MENU_TOGGL,
    LAYOUT_BOTTOM_MESSAGE_UPDATE
} from '../actions/laoyut';

const defaultLayoutState = () => ({
    bottomMessageText: '',
    menuIsOpen: JSON.parse(localStorage.getItem('menuIsOpen') || 'false')
});

export default (state = defaultLayoutState(), action) => {
    switch (action.type) {
        case LAYOUT_MENU_TOGGL:
            localStorage.setItem('menuIsOpen', !state.menuIsOpen);
            return {
                ...state,
                menuIsOpen: !state.menuIsOpen
            };
        case LAYOUT_BOTTOM_MESSAGE_UPDATE:
            return {
                ...state,
                bottomMessageText: action.text
            };
        default:
            return state;
    }
};
