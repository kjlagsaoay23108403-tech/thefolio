// frontend/src/pages/ProfilePage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import Header from '../components/Header';

const ProfilePage = ({ toggleDarkMode, darkMode }) => {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
      setPic(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (newPw.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      await API.put('/auth/change-password', {
        currentPassword: curPw,
        newPassword: newPw,
      });
      setMsg('Password changed successfully!');
      setCurPw('');
      setNewPw('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error changing password');
    }
  };

 const picSrc = user?.profilePic
  ? `${process.env.REACT_APP_API_URL?.replace('/api', '')}/uploads/${user.profilePic}`
  : '/default-avatar.png';
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="profile-page">
        <div className="profile-container">
          <h2>My Profile</h2>

          {msg && <p className="success-msg">{msg}</p>}
          {error && <p className="error-msg">{error}</p>}

          <div className="profile-pic">
            <img src={picSrc} alt="Profile" />
          </div>

          <form onSubmit={handleProfile}>
            <h3>Edit Profile</h3>

            <input
              type="text"
              placeholder="Display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              placeholder="Short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPic(e.target.files[0])}
            />

            {pic && <p>Selected: {pic.name}</p>}

            <button type="submit">Save Profile</button>
          </form>

          <form onSubmit={handlePassword}>
            <h3>Change Password</h3>

            <input
              type="password"
              placeholder="Current password"
              value={curPw}
              onChange={(e) => setCurPw(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="New password (min 6 chars)"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
            />

            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;