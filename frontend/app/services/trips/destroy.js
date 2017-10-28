import { getSessionHash } from '../sessionHash';

export default ({ id }) => fetch(`/api/trips/${id}/`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).catch(() => {});
