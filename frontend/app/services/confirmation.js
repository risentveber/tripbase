export default ({ confirmationId }) => fetch(`/api/confirmations/${confirmationId}/`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        return;
    }

    throw response;
});
