import { getSessionHash } from '../sessionHash';

export default ({ id }) => fetch(`/api/time_entries/${id}/`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).catch(() => {});
