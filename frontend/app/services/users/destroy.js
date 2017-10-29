import { getSessionHash } from '../sessionHash';

export default userId => fetch(`/api/users/${userId}/`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).catch(() => {});
