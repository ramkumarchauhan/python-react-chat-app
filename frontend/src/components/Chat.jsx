import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import profileIcon from '../assets/react.svg'; // Default profile icon path
import uploadIcon from '../assets/upload.png'; // Upload icon path
import { BsThreeDots, BsGearFill } from 'react-icons/bs'; // Dropdown and settings icons
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Chat = ({ username, setUsername }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [profilePic, setProfilePic] = useState(profileIcon); // Main profile picture state
    const [profilePicPreview, setProfilePicPreview] = useState(profileIcon); // Preview profile picture
    const [showModal, setShowModal] = useState(false);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [mediaFile, setMediaFile] = useState(null);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });
        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() || mediaFile) {
            const messageData = {
                username,
                content: newMessage,
                image_url: mediaFile,
                timestamp: new Date().toLocaleTimeString(),
            };
            socket.emit('message', messageData);
            setNewMessage('');
            setMediaFile(null); // Reset media file after sending
        }
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result); // Set preview image in modal
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const messageData = {
                    username,
                    content: '',
                    image_url: reader.result,
                    timestamp: new Date().toLocaleTimeString(),
                };
                socket.emit('message', messageData); // Send media file immediately
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSaveProfile = () => {
        setProfilePic(profilePicPreview); // Update the main profile picture
        setShowModal(false); // Close the modal
    };

    const handleCancel = () => {
        setProfilePicPreview(profilePic); // Reset preview to current profile picture
        setShowModal(false); // Close the modal
    };

    const handleDeleteMessage = (index) => {
        setMessages((prev) => prev.filter((_, i) => i !== index));
        setDropdownIndex(null); // Close dropdown after deleting
    };

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Chat Room</h1>
                <img
                    src={profilePic} // Use the main profile picture state here
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setShowModal(true)}
                />
            </div>

            <div className="flex-grow overflow-auto p-4 bg-white rounded-lg shadow">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 flex ${
                            msg.username === username
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`p-2 rounded-lg shadow-sm ${
                                msg.username === username
                                    ? 'bg-blue-200 text-right'
                                    : 'bg-gray-200 text-left'
                            }`}
                        >
                            <strong>{msg.username}:</strong>
                            {msg.image_url && (
                                <img
                                    src={msg.image_url}
                                    alt="Message"
                                    className="w-24 h-24 object-cover rounded my-2"
                                />
                            )}
                            <span className="block">{msg.content}</span>
                            <span className="text-gray-500 text-sm block text-right">
                                {msg.timestamp}
                            </span>
                        </div>
                        <div className="relative">
                            <BsThreeDots
                                className="cursor-pointer"
                                onClick={() => toggleDropdown(index)}
                            />
                            {dropdownIndex === index && (
                                <div className="absolute right-0 mt-1 w-32 bg-white shadow-lg rounded">
                                    <button
                                        onClick={() =>
                                            handleDeleteMessage(index)
                                        }
                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex mt-4">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <div className="relative">
                    <label className="cursor-pointer">
                        <img
                            src={uploadIcon}
                            alt="Upload"
                            className="w-10 h-10 ml-2 cursor-pointer"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white p-2 rounded ml-2"
                >
                    Send
                </button>
            </div>

            {/* Profile Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96 text-center relative">
                        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

                        {/* Settings Icon */}
                        <BsGearFill
                            className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                            size={24}
                            onClick={handleSettingsClick}
                        />

                        <div className="mb-4">
                            <div
                                className="relative w-24 h-24 mx-auto rounded-full bg-gray-200"
                                style={{
                                    backgroundImage:
                                        'url(https://via.placeholder.com/150)', // Placeholder background if you want an image
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <img
                                    src={profilePicPreview} // Use the preview image here
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <label className="block cursor-pointer mt-4">
                                <span className="bg-blue-500 text-white p-2 rounded w-full text-center">
                                    Change Photo
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Enter your username"
                            />
                        </div>
                        <button
                            onClick={handleSaveProfile}
                            className="bg-blue-500 text-white p-2 rounded w-full"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel} // Reset preview image and close modal
                            className="bg-gray-300 text-black p-2 rounded w-full mt-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
