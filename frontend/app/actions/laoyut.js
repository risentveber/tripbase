export const LAYOUT_MENU_TOGGL = 'LAYOUT_MENU_TOGGL';
export const LAYOUT_BOTTOM_MESSAGE_UPDATE = 'LAYOUT_BOTTOM_MESSAGE_UPDATE';

export function toggl() {
    return {
        type: LAYOUT_MENU_TOGGL
    };
}

export function setBottomMessage(text) {
    return {
        type: LAYOUT_BOTTOM_MESSAGE_UPDATE,
        text
    };
}
