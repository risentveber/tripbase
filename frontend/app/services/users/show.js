import { getSessionHash } from '../sessionHash';

export default userId => fetch(`/api/users/${userId}`, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
}).then(response => {
    if (response.ok) {
        return response.json();
    }

    throw response.status;
});
