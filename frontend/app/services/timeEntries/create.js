import { getSessionHash } from '../sessionHash';

export default ({ date, distance, duration }) => fetch('/api/time_entries/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
    body: JSON.stringify({ time_entry: { date, distance, duration } })
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw data.errors;
    }

    return data;
});
