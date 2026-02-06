import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import DocumentUpload from './components/DocumentUpload';
import SystemStats from './components/SystemStats';
import { getHealth, getMetrics } from './services/api';

function App() {
    const [health, setHealth] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [uploadKey, setUploadKey] = useState(0);

    useEffect(() => {
        fetchSystemInfo();
        const interval = setInterval(fetchSystemInfo, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchSystemInfo = async () => {
        try {
            const [healthData, metricsData] = await Promise.all([
                getHealth(),
                getMetrics()
            ]);
            setHealth(healthData);
            setMetrics(metricsData);
        } catch (error) {
            console.error('Error fetching system info:', error);
        }
    };

    const handleUploadSuccess = () => {
        fetchSystemInfo();
        setUploadKey(prev => prev + 1);
    };

    return (
        <div className="App">
            <header className="app-header">
                <div className="header-content">
                    <h1>🤖 Enterprise Knowledge Assistant</h1>
                    <p>Agentic RAG System powered by Groq & LangGraph</p>
                </div>
            </header>

            <div className="app-container">
                <div className="sidebar">
                    <SystemStats health={health} metrics={metrics} />
                    <DocumentUpload onUploadSuccess={handleUploadSuccess} />
                </div>

                <div className="main-content">
                    <ChatInterface key={uploadKey} />
                </div>
            </div>
        </div>
    );
}

export default App;
