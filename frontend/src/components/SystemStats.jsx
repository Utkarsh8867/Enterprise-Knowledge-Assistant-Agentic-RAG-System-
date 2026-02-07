import React from 'react';
import { Activity, Database, Cpu, Zap, Settings, TrendingUp } from 'lucide-react';
import './SystemStats.css';

const SystemStats = ({ health, metrics }) => {
    const getDocumentPercentage = () => {
        if (!health?.vector_store_size) return 0;
        return Math.min((health.vector_store_size / 100) * 100, 100);
    };

    return (
        <div className="system-stats-card">
            <h3 className="card-title">
                <div className="card-title-icon">
                    <Activity size={20} />
                </div>
                System Status
            </h3>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                        <Zap size={22} style={{ color: '#10b981' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Status</p>
                        <p className="stat-value">
                            {health?.status === 'healthy' ? (
                                <span className="status-healthy">
                                    <span className="status-pulse"></span>
                                    Online
                                </span>
                            ) : (
                                <span className="status-error">
                                    <span className="status-pulse"></span>
                                    Offline
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
                        <Database size={22} style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Documents</p>
                        <p className="stat-value">
                            {health?.vector_store_size || 0} chunks
                        </p>
                        <div className="performance-bar">
                            <div
                                className="performance-fill"
                                style={{ width: `${getDocumentPercentage()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                        <Cpu size={22} style={{ color: '#8b5cf6' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">AI Model</p>
                        <p className="stat-value">
                            <span className="model-name">
                                {health?.model?.split('-').slice(0, 2).join('-') || 'N/A'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {metrics && (
                <div className="metrics-details">
                    <h4>
                        <div className="metrics-icon">
                            <Settings size={12} />
                        </div>
                        Configuration
                    </h4>

                    <div className="metric-row">
                        <span className="metric-label">
                            <TrendingUp size={14} />
                            Embedding Model
                        </span>
                        <span className="metric-value">
                            {metrics.embedding_model?.split('/')[1]?.substring(0, 15) || 'N/A'}
                        </span>
                    </div>

                    <div className="metric-row">
                        <span className="metric-label">
                            <Database size={14} />
                            Chunk Size
                        </span>
                        <span className="metric-value">{metrics.chunk_size}</span>
                    </div>

                    <div className="metric-row">
                        <span className="metric-label">
                            <Activity size={14} />
                            Top K Results
                        </span>
                        <span className="metric-value">{metrics.top_k}</span>
                    </div>
                </div>
            )}

            {!health && (
                <div className="stats-loading">
                    <div className="stats-spinner"></div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Loading system stats...
                    </p>
                </div>
            )}
        </div>
    );
};

export default SystemStats;
