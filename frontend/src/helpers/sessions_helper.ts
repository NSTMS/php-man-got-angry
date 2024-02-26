export const get_session_id = () => localStorage.getItem('session_id');
export const set_session_id = (session_id: string) => localStorage.setItem('session_id', session_id);