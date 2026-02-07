import React from 'react';
import { Brain, Zap, Shield, Target, Cpu, Database, GitBranch, CheckCircle } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
    const features = [
        {
            icon: Brain,
            title: 'Multi-Agent RAG Pipeline',
            description: '6 specialized AI agents working together: Query Planner, Retrieval, Reranker, Answer Synthesis, Hallucination Verifier, and Confidence Gate'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Powered by Groq\'s LPU technology with Llama 3.3 70B model for blazing-fast inference speeds'
        },
        {
            icon: Shield,
            title: 'Hallucination Detection',
            description: 'Advanced verification system ensures all answers are grounded in your documents with confidence scoring'
        },
        {
            icon: Target,
            title: 'Precise Retrieval',
            description: 'FAISS vector store with semantic search and intelligent reranking for highly relevant results'
        }
    ];

    const techStack = [
        { category: 'Frontend', items: ['React 18', 'Vite', 'Axios', 'Lucide Icons'] },
        { category: 'Backend', items: ['FastAPI', 'Python 3.10+', 'Uvicorn'] },
        { category: 'AI/ML', items: ['LangChain', 'LangGraph', 'Groq API', 'Sentence Transformers'] },
        { category: 'Storage', items: ['FAISS Vector DB', 'Local File System'] }
    ];

    const capabilities = [
        'Upload and process PDF, DOCX, and TXT documents',
        'Semantic search across all uploaded documents',
        'Multi-query decomposition for complex questions',
        'Context-aware answer generation with citations',
        'Real-time confidence scoring',
        'Source attribution for transparency',
        'Responsive design for all devices'
    ];

    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="hero-content">
                    <h1>Enterprise Knowledge Assistant</h1>
                    <p className="hero-subtitle">
                        An advanced Agentic RAG (Retrieval-Augmented Generation) system that transforms
                        your documents into an intelligent knowledge base
                    </p>
                </div>
            </div>

            <div className="about-section">
                <h2>🎯 What is This?</h2>
                <p className="section-description">
                    The Enterprise Knowledge Assistant is a cutting-edge AI-powered system that allows you to
                    upload documents and ask questions about them. Unlike traditional search, our system uses
                    multiple AI agents working together to understand your questions, retrieve relevant information,
                    verify accuracy, and provide confident, cited answers.
                </p>
            </div>

            <div className="about-section">
                <h2>✨ Key Features</h2>
                <div className="features-grid">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    <Icon size={32} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="about-section">
                <h2>🔧 Technology Stack</h2>
                <div className="tech-grid">
                    {techStack.map((tech, index) => (
                        <div key={index} className="tech-card">
                            <h3>{tech.category}</h3>
                            <ul>
                                {tech.items.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section">
                <h2>🚀 Capabilities</h2>
                <div className="capabilities-list">
                    {capabilities.map((capability, index) => (
                        <div key={index} className="capability-item">
                            <CheckCircle size={20} className="check-icon" />
                            <span>{capability}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section architecture-section">
                <h2>🏗️ System Architecture</h2>
                <div className="architecture-diagram">
                    <div className="arch-layer">
                        <div className="arch-box frontend">
                            <Cpu size={24} />
                            <h4>React Frontend</h4>
                            <p>Modern UI with real-time updates</p>
                        </div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-layer">
                        <div className="arch-box backend">
                            <GitBranch size={24} />
                            <h4>FastAPI Backend</h4>
                            <p>High-performance REST API</p>
                        </div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-layer">
                        <div className="arch-box agents">
                            <Brain size={24} />
                            <h4>LangGraph Agents</h4>
                            <p>6-agent RAG pipeline</p>
                        </div>
                    </div>
                    <div className="arch-arrow">↓</div>
                    <div className="arch-layer multi">
                        <div className="arch-box storage">
                            <Database size={24} />
                            <h4>FAISS Vector Store</h4>
                            <p>Semantic search</p>
                        </div>
                        <div className="arch-box llm">
                            <Zap size={24} />
                            <h4>Groq LLM</h4>
                            <p>Llama 3.3 70B</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-section stats-section">
                <h2>📊 System Specifications</h2>
                <div className="stats-grid">
                    <div className="stat-box">
                        <div className="stat-number">6</div>
                        <div className="stat-label">AI Agents</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">70B</div>
                        <div className="stat-label">LLM Parameters</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">384</div>
                        <div className="stat-label">Embedding Dimensions</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">3</div>
                        <div className="stat-label">File Formats</div>
                    </div>
                </div>
            </div>

            <div className="about-section workflow-section">
                <h2>🔄 How It Works</h2>
                <div className="workflow-steps">
                    <div className="workflow-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h4>Upload Documents</h4>
                            <p>Upload PDF, DOCX, or TXT files to build your knowledge base</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h4>Processing</h4>
                            <p>Documents are chunked, embedded, and indexed in the vector store</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h4>Ask Questions</h4>
                            <p>Query planner analyzes your question and creates sub-queries</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h4>Retrieval & Reranking</h4>
                            <p>Relevant chunks are retrieved and reranked for accuracy</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                            <h4>Answer Generation</h4>
                            <p>AI synthesizes an answer with citations from your documents</p>
                        </div>
                    </div>
                    <div className="workflow-step">
                        <div className="step-number">6</div>
                        <div className="step-content">
                            <h4>Verification</h4>
                            <p>Hallucination checker verifies accuracy and assigns confidence score</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-footer">
                <p>Built with ❤️ using React, FastAPI, LangGraph, and Groq</p>
                <p className="version">Version 1.0.0</p>
            </div>
        </div>
    );
};

export default AboutPage;
