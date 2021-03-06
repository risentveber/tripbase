import { getSessionHash } from '../sessionHash';

export default tripId => fetch(`/api/trips/${tripId}/`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).catch(() => {});
