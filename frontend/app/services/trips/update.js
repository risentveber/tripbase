import { getSessionHash } from '../sessionHash';

export default ({ id, start_date, end_date, comment, destination }) => fetch(`/api/trips/${id}`, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
    body: JSON.stringify({ trip: { start_date, end_date, comment, destination } })
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw data.errors;
    }

    return data;
});
