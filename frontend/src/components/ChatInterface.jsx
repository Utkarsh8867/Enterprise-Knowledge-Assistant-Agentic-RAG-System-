import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Lightbulb, TrendingUp, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';
import { askQuestion } from '../services/api';
import './ChatInterface.css';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await askQuestion(userMessage);
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: response.answer,
                confidence: response.confidence,
                sources: response.sources || []
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                confidence: 0,
                sources: [],
                error: true
            }]);
        } finally {
            setLoading(false);
        }
    };

    const getConfidenceColor = (confidence) => {
        if (confidence >= 0.85) return '#10b981';
        if (confidence >= 0.7) return '#f59e0b';
        return '#ef4444';
    };

    const getConfidenceLabel = (confidence) => {
        if (confidence >= 0.85) return 'High Confidence';
        if (confidence >= 0.7) return 'Medium Confidence';
        return 'Low Confidence';
    };

    const getConfidenceIcon = (confidence) => {
        if (confidence >= 0.85) return <CheckCircle2 className="confidence-icon" />;
        if (confidence >= 0.7) return <TrendingUp className="confidence-icon" />;
        return <AlertCircle className="confidence-icon" />;
    };

    return (
        <div className="chat-interface">
            <div className="chat-header">
                <div className="chat-title">
                    <div className="chat-title-icon">
                        <Bot size={20} />
                    </div>
                    <span>AI Assistant</span>
                </div>
            </div>

            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="welcome-message">
                        <div className="welcome-icon">
                            <Lightbulb size={40} />
                        </div>
                        <h3>Welcome to Your Knowledge Assistant</h3>
                        <p>Upload documents and ask me anything. I'll provide accurate answers with sources and confidence scores.</p>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        <div className="message-content">
                            <div className="message-text">{message.content}</div>

                            {message.confidence !== null && message.confidence !== undefined && (
                                <div className="message-meta">
                                    <div
                                        className="confidence-badge"
                                        style={{ backgroundColor: getConfidenceColor(message.confidence) }}
                                    >
                                        {getConfidenceIcon(message.confidence)}
                                        <span>{getConfidenceLabel(message.confidence)}: {(message.confidence * 100).toFixed(0)}%</span>
                                    </div>

                                    {message.sources && message.sources.length > 0 && (
                                        <div className="sources">
                                            <strong>
                                                <BookOpen size={16} />
                                                Sources Referenced
                                            </strong>
                                            <ul>
                                                {message.sources.map((source, idx) => (
                                                    <li key={idx}>{source}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="message assistant">
                        <div className="message-content">
                            <div className="typing-indicator">
                                <div className="typing-dots">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                                <span>AI is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about your documents..."
                    disabled={loading}
                    className="chat-input"
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="send-button"
                >
                    <Send size={18} />
                    <span>Send</span>
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
