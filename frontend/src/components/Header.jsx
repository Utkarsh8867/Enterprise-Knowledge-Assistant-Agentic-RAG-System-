import React, { useState } from 'react';
import { Menu, X, Info, MessageSquare, Upload, Activity } from 'lucide-react';
import './Header.css';

const Header = ({ onNavigate, currentView }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'chat', label: 'Chat', icon: MessageSquare },
        { id: 'about', label: 'About', icon: Info }
    ];

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-brand">
                    <div className="brand-icon">🤖</div>
                    <div className="brand-text">
                        <h1>Enterprise Knowledge Assistant</h1>
                        <p>Agentic RAG System powered by Groq & LangGraph</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="desktop-nav">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className="mobile-nav">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                                onClick={() => {
                                    onNavigate(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </header>
    );
};

export default Header;
