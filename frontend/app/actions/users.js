export const USER_ATTRIBUTE_CHANGED = 'USER_ATTRIBUTE_CHANGED';
export const USER_START_CREATION = 'USER_START_CREATION';
export const USER_CREATED = 'USER_CREATED';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_DELETE = 'USER_DELETE';
export const USERS_LOADED = 'USERS_LOADED';
export const USER_SELECT = 'USER_SELECT';

export const changeUserAttribute = (attr, value) => ({
    type: USER_ATTRIBUTE_CHANGED,
    attr,
    value
});

export const userCreated = user => ({
    type: USER_CREATED,
    user
});

export const userStartCreation = () => ({ type: USER_START_CREATION });

export const selectUser = user => ({
    type: USER_SELECT,
    user
});

export const userUpdate = user => ({
    type: USER_UPDATE,
    user
});

export const userDelete = user => ({
    type: USER_DELETE,
    id: user.id
});

export const usersLoaded = users => ({
    type: USERS_LOADED,
    users
});
