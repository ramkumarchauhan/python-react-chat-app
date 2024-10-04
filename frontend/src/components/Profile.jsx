// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = ({ token }) => {
//     const [profile, setProfile] = useState({ username: '', bio: '', profile_pic: '' });
//     const [bio, setBio] = useState('');
//     const [profilePic, setProfilePic] = useState('');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const response = await axios.get('http://localhost:5000/profile', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setProfile(response.data);
//             setBio(response.data.bio || '');
//             setProfilePic(response.data.profile_pic || '');
//         };
//         fetchProfile();
//     }, [token]);

//     const updateProfile = async () => {
//         await axios.put('http://localhost:5000/profile', { bio, profile_pic: profilePic }, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile({ ...profile, bio, profile_pic: profilePic });
//     };

//     return (
//         <div>
//             <h1>{profile.username}'s Profile</h1>
//             <img src={profile.profile_pic || 'default.jpg'} alt="Profile" />
//             <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
//             <input 
//                 type="text" 
//                 value={profilePic} 
//                 onChange={(e) => setProfilePic(e.target.value)} 
//                 placeholder="Profile Picture URL" 
//             />
//             <button onClick={updateProfile}>Update Profile</button>
//         </div>
//     );
// };

// export default Profile;
