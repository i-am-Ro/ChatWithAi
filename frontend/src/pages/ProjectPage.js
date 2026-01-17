import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';

function ProjectPage() {
    const { projectId } = useParams();
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate();

    const handleChat = async (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        const userMsg = { role: 'user', content: chatMessage };
        setChatHistory(prev => [...prev, userMsg]);
        setChatMessage('');

        try {
            const url = "https://chatwithai-4req.onrender.com/api/chat";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ projectId, message: userMsg.content })
            });
            const result = await response.json();

            if (result.success) {
                setChatHistory(prev => [
                    ...prev,
                    { role: 'ai', content: result.response }
                ]);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const url = `https://chatwithai-4req.onrender.com/api/chat/history?projectId=${projectId}`;
                const response = await fetch(url, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const result = await response.json();

                if (result.success) {
                    const uiMessages = result.messages.map(msg => ({
                        role: msg.role === 'user' ? 'user' : 'ai',
                        content: msg.content
                    }));
                    setChatHistory(uiMessages);
                } else {
                    handleError(result.message);
                }
            } catch (err) {
                handleError(err);
            }
        };

        fetchChatHistory();
    }, [projectId]);

    return (
        <div className="project-container">
            <div className="header">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="secondary"
                >
                    &larr; Back to Dashboard
                </button>
                <h2 style={{ marginLeft: '20px', display: 'inline' }}>
                    Chat Interface
                </h2>
            </div>

            <div
                className="card"
                style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}
            >
                <div className="chat-window" style={{ flex: 1, padding: '20px 0' }}>
                    {chatHistory.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#aaa', marginTop: '50px' }}>
                            <p>Start a conversation with your agent!</p>
                        </div>
                    )}

                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.role}`}>
                            <strong>{msg.role === 'user' ? 'You' : 'Agent'}: </strong>
                            {msg.content}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleChat} className="chat-input-area">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        autoFocus
                    />
                    <button type="submit">Send</button>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
}

export default ProjectPage;
