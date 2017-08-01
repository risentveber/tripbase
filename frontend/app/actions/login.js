export const LOGIN_ATTRIBUTE_CHANGE = 'LOGIN_ATTRIBUTE_CHANGE';
export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const LOGIN_AUTHENTIFICATED = 'LOGIN_AUTHENTIFICATED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

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

export function failed(errors) {
    return {
        type: LOGIN_FAILED,
        errors
    };
}

export function athentificated(user) {
    return {
        type: LOGIN_AUTHENTIFICATED,
        user
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
