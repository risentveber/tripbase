export const LOGIN_ATTRIBUTE_CHANGE = 'LOGIN_ATTRIBUTE_CHANGE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';

export function changeAttribute(attribute, value) {
    return {
        type: LOGIN_ATTRIBUTE_CHANGE,
        attribute,
        value
    };
}

export function submit() {
    return {
        type: LOGIN_SUBMIT
    };
}
