import { getSessionHash } from '../sessionHash';

export default id => fetch(`/api/users/${id}`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json());
