export const TIME_ENTRY_ATTRIBUTE_CHANGED = 'TIME_ENTRY_ATTRIBUTE_CHANGED';
export const TIME_ENTRY_CREATE = 'TIME_ENTRY_CREATE';
export const TIME_ENTRY_UPDATE = 'TIME_ENTRY_UPDATE';
export const TIME_ENTRY_DELETE = 'TIME_ENTRY_DELETE';

export const timeEntryAttributeChanged = (attr, value) => ({
    type: TIME_ENTRY_ATTRIBUTE_CHANGED,
    attr,
    value
});

export const timeEntryCreate = timeEntry => ({
    type: TIME_ENTRY_CREATE,
    timeEntry
});

export const timeEntryUpdate = timeEntry => ({
    type: TIME_ENTRY_UPDATE,
    timeEntry
});

export const timeEntryDelete = id => ({
    type: TIME_ENTRY_DELETE,
    id
});
