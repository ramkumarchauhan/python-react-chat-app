// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Settings = ({ onLogout }) => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         onLogout();  // Clear token from app state and localStorage
//         navigate('/login');  // Redirect to login page
//     };

//     return (
//         <div className="settings-page p-4">
//             <h2 className="text-xl font-bold">Settings</h2>
//             <button 
//                 className="bg-red-500 text-white p-2 rounded mt-4" 
//                 onClick={handleLogout}
//             >
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default Settings;
// Settings.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center p-4">
                <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                </button>
                <h2 className="text-lg font-bold">Settings</h2>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <button 
                    onClick={onLogout} 
                    className="bg-red-500 text-white p-4 rounded shadow-lg transition duration-300 hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Settings;
