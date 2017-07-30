export const getSessionHash = () => localStorage.getItem('session_hash');
export const setSessionHash = hash => localStorage.setItem('session_hash', hash);
