import React from 'react';
import { Activity, Database, Cpu, Zap } from 'lucide-react';
import './SystemStats.css';

const SystemStats = ({ health, metrics }) => {
    return (
        <div className="system-stats-card">
            <h3 className="card-title">
                <Activity size={20} />
                System Status
            </h3>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="stat-icon" style={{ background: '#10b98120' }}>
                        <Zap size={18} style={{ color: '#10b981' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Status</p>
                        <p className="stat-value">
                            {health?.status === 'healthy' ? (
                                <span className="status-healthy">● Healthy</span>
                            ) : (
                                <span className="status-error">● Offline</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ background: '#3b82f620' }}>
                        <Database size={18} style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Documents</p>
                        <p className="stat-value">
                            {health?.vector_store_size || 0} chunks
                        </p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ background: '#8b5cf620' }}>
                        <Cpu size={18} style={{ color: '#8b5cf6' }} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Model</p>
                        <p className="stat-value model-name">
                            {health?.model || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {metrics && (
                <div className="metrics-details">
                    <h4>Configuration</h4>
                    <div className="metric-row">
                        <span>Embedding Model:</span>
                        <span className="metric-value">{metrics.embedding_model?.split('/')[1] || 'N/A'}</span>
                    </div>
                    <div className="metric-row">
                        <span>Chunk Size:</span>
                        <span className="metric-value">{metrics.chunk_size}</span>
                    </div>
                    <div className="metric-row">
                        <span>Top K Results:</span>
                        <span className="metric-value">{metrics.top_k}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemStats;
