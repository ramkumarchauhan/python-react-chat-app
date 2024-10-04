import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', { username, password });
            setMessage('User registered successfully! You can now log in.');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="mb-4 text-lg font-bold">Register</h2>
                {message && <p className="text-green-500">{message}</p>}
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="border p-2 mb-4 w-full" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 mb-4 w-full" />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
                <p className="mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Go to Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
