import { getSessionHash, setSessionHash } from '../sessionHash';

export default () => fetch('/api/session/', {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).then(data => {
    setSessionHash(null);
    return data;
}).catch(() => {});
