export const TIME_ENTRY_ATTRIBUTE_CHANGED = 'TIME_ENTRY_ATTRIBUTE_CHANGED';
export const TIME_ENTRY_CREATED = 'TIME_ENTRY_CREATED';
export const TIME_ENTRY_UPDATE = 'TIME_ENTRY_UPDATE';
export const TIME_ENTRY_DELETE = 'TIME_ENTRY_DELETE';
export const TIME_ENTRIES_LOADED = 'TIME_ENTRIES_LOADED';
export const TIME_ENTRY_SELECT = 'TIME_ENTRY_SELECT';

export const timeEntryAttributeChanged = (attr, value) => ({
    type: TIME_ENTRY_ATTRIBUTE_CHANGED,
    attr,
    value
});

export const timeEntryCreated = timeEntry => ({
    type: TIME_ENTRY_CREATED,
    timeEntry
});

export const selectTimeEntry = timeEntry => ({
    type: TIME_ENTRY_SELECT,
    timeEntry
});

export const timeEntryUpdate = timeEntry => ({
    type: TIME_ENTRY_UPDATE,
    timeEntry
});

export const timeEntryDelete = timeEntry => ({
    type: TIME_ENTRY_DELETE,
    id: timeEntry.id
});

export const timeEntriesLoaded = timeEntries => ({
    type: TIME_ENTRIES_LOADED,
    timeEntries
});
