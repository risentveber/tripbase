export const TRIP_ATTRIBUTE_CHANGED = 'TRIP_ATTRIBUTE_CHANGED';
export const TRIP_CREATED = 'TRIP_CREATED';
export const TRIP_UPDATE = 'TRIP_UPDATE';
export const TRIP_DELETE = 'TRIP_DELETE';
export const TRIPS_LOADED = 'TRIPS_LOADED';
export const TRIP_SELECT = 'TRIP_SELECT';

export const tripAttributeChanged = (attr, value) => ({
    type: TRIP_ATTRIBUTE_CHANGED,
    attr,
    value
});

export const tripCreated = trip => ({
    type: TRIP_CREATED,
    trip
});

export const selectTrip = trip => ({
    type: TRIP_SELECT,
    trip
});

export const tripUpdate = trip => ({
    type: TRIP_UPDATE,
    trip
});

export const tripDelete = trip => ({
    type: TRIP_DELETE,
    id: trip.id
});

export const tripsLoaded = trips => ({
    type: TRIPS_LOADED,
    trips
});
