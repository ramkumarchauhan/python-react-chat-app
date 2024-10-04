// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setToken, setUsername }) => {
//     const [username, setUser] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/login', { username, password });
//             const token = response.data.access_token;

//             setToken(token);
//             setUsername(username);
//             setError('');
//             navigate('/chat');
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Login failed');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-200">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//                 <h2 className="mb-4 text-lg font-bold">Login</h2>
//                 {error && <p className="text-red-500">{error}</p>}
//                 <input type="text" placeholder="Username" value={username} onChange={(e) => setUser(e.target.value)} required className="border p-2 mb-4 w-full" />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 mb-4 w-full" />
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
//                 <p className="mt-4">
//                     Don't have an account? <a href="/register" className="text-blue-500">Go to Register</a>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setUsername }) => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const token = response.data.access_token;

            // Save token and username to localStorage to persist login state
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            setToken(token);
            setUsername(username);
            setError('');
            navigate('/chat'); // Redirect to chat page after login
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="mb-4 text-lg font-bold">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Login
                </button>
                <p className="mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500">Go to Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
