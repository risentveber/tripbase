import { getSessionHash } from '../sessionHash';

export default () => fetch('/api/users/', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    }
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw data.errors;
    }

    return data;
});
