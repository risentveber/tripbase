export default ({ email, password }) => fetch('/api/session/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ session: { email, password } })
}).then(response => response.json()).then(data => {
    if (data.errors) {
        throw data.errors;
    }

    return data;
});
