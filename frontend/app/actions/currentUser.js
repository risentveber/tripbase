export const USER_ATTRIBUTE_CHANGE = 'USER_ATTRIBUTE_CHANGE';
export const USER_CREATED = 'USER_CREATED';
export const USER_START_CREATION = 'USER_START_CREATION';

export function changeUserAttribute(attribute, value) {
    return {
        type: USER_ATTRIBUTE_CHANGE,
        attribute,
        value
    };
}

export function userStartCreation() {
    return {
        type: USER_START_CREATION
    };
}
