import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
import SystemStats from './components/SystemStats.jsx';
import { getHealth, getMetrics, createNewSession, clearSession } from './services/api';
import { Brain, RefreshCw } from 'lucide-react';

function App() {
    const [health, setHealth] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [uploadKey, setUploadKey] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSystemInfo();
        const interval = setInterval(fetchSystemInfo, 10000);

        // Simulate initial loading
        setTimeout(() => setLoading(false), 1500);

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

    const handleNewSession = async () => {
        try {
            await createNewSession();
            setUploadKey(prev => prev + 1);
            fetchSystemInfo();
            window.location.reload(); // Refresh to clear all state
        } catch (error) {
            console.error('Failed to create new session:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="App">
            {/* Animated Background Particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo-icon">
                            <Brain size={28} />
                        </div>
                        <div className="header-text">
                            <h1>Enterprise Knowledge Assistant</h1>
                            <p>Powered by Agentic RAG • Groq • LangGraph</p>
                        </div>
                    </div>
                    <div className="header-badge">
                        <span className="status-dot"></span>
                        <span>System Online</span>
                    </div>
                    <button className="new-session-btn" onClick={handleNewSession} title="Start New Session">
                        <RefreshCw size={18} />
                        <span>New Session</span>
                    </button>
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
