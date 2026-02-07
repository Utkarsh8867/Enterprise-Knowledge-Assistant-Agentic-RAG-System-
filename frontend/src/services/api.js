import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Session management
let sessionId = null;

const getSessionId = () => {
    if (!sessionId) {
        sessionId = localStorage.getItem('session_id');
    }
    return sessionId;
};

const setSessionId = (id) => {
    sessionId = id;
    if (id) {
        localStorage.setItem('session_id', id);
    } else {
        localStorage.removeItem('session_id');
    }
};

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add session ID to all requests
api.interceptors.request.use((config) => {
    const sid = getSessionId();
    if (sid) {
        config.headers['X-Session-ID'] = sid;
    }
    return config;
});

// Extract session ID from responses
api.interceptors.response.use((response) => {
    const newSessionId = response.headers['x-session-id'];
    if (newSessionId && newSessionId !== getSessionId()) {
        setSessionId(newSessionId);
    }
    return response;
});

export const getHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};

export const getMetrics = async () => {
    try {
        const response = await api.get('/metrics');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch metrics:', error);
        throw error;
    }
};

export const uploadDocument = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload-document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};

export const askQuestion = async (query) => {
    try {
        const response = await api.post('/ask', { query });
        return response.data;
    } catch (error) {
        console.error('Question failed:', error);
        throw error;
    }
};

export const createNewSession = async () => {
    try {
        const response = await api.post('/session/new');
        setSessionId(response.data.session_id);
        return response.data;
    } catch (error) {
        console.error('Failed to create session:', error);
        throw error;
    }
};

export const clearSession = async () => {
    try {
        const response = await api.delete('/session/clear');
        setSessionId(null);
        return response.data;
    } catch (error) {
        console.error('Failed to clear session:', error);
        throw error;
    }
};

export const getSessionInfo = async () => {
    try {
        const response = await api.get('/session/info');
        return response.data;
    } catch (error) {
        console.error('Failed to get session info:', error);
        throw error;
    }
};

// Clear session on page unload (when user closes tab/browser)
window.addEventListener('beforeunload', () => {
    if (getSessionId()) {
        // Use sendBeacon for reliable cleanup on page unload
        const url = `${API_BASE_URL}/session/clear`;
        const sid = getSessionId();

        // Create a synchronous request for cleanup
        navigator.sendBeacon(url, JSON.stringify({
            headers: { 'X-Session-ID': sid }
        }));

        setSessionId(null);
    }
});

export default api;
