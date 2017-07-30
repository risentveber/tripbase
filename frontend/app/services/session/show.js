import { getSessionHash } from '../sessionHash';

export default () => fetch('/api/session/', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw Error('No valid session');
    }

    return data;
});
