export const CURRENT_USER_ATTRIBUTE_CHANGE = 'CURRENT_USER_ATTRIBUTE_CHANGE';
export const USER_CREATED = 'USER_CREATED';
export const USER_START_CREATION = 'USER_START_CREATION';

export function changeCurrentUserAttribute(attribute, value) {
    return {
        type: CURRENT_USER_ATTRIBUTE_CHANGE,
        attribute,
        value
    };
}

export function userStartCreation() {
    return {
        type: USER_START_CREATION
    };
}

export function userCreated(user) {
    return {
        type: USER_CREATED,
        user
    };
}
