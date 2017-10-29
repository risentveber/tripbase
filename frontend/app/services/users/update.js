import { getSessionHash } from '../sessionHash';

export default ({ id, name, email, password, password_confirmation }) => fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Session-Hash': getSessionHash()
    },
    body: JSON.stringify({ user: { name, email, password, password_confirmation } })
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw data.errors;
    }

    return data;
});
