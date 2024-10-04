import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/settings'; // Import Settings component

const App = () => {
    // Initialize token and username from localStorage
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [username, setUsername] = useState(() => localStorage.getItem('username'));

    // Update localStorage when token or username changes
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }

        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [token, username]);

    const handleLogout = () => {
        setToken(null);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chat" element={token ? <Chat username={username} /> : <Navigate to="/login" />} />
                <Route path="/settings" element={token ? <Settings onLogout={handleLogout} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
