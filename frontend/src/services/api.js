import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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

export default api;
