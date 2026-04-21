// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminPage = ({ toggleDarkMode, darkMode }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/posts')
      ]).then(([usersRes, postsRes]) => {
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      });
    } catch (err) {
      setError('Failed to load admin data. Please try again.');
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await API.put(`/admin/users/${id}/status`);
      setUsers(users.map((u) => (u._id === id ? data.user : u)));
    } catch (err) {
      setError('Failed to update user status');
      console.error('Toggle status error:', err);
    }
  };

  const removePost = async (id) => {
    try {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(
        posts.map((p) =>
          p._id === id ? { ...p, status: 'removed' } : p
        )
      );
    } catch (err) {
      setError('Failed to remove post');
      console.error('Remove post error:', err);
    }
  };

  if (loading) {
    return (
      <>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="admin-page">
          <div className="admin-container">
            <p className="loading-text">Loading admin dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-header">
            <h2>Admin Dashboard</h2>
            <p>Welcome back, Johan Lei!</p>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="admin-tabs">
            <button
              onClick={() => setTab('users')}
              className={tab === 'users' ? 'active' : ''}
            >
              👥 Members ({users.length})
            </button>

            <button
              onClick={() => setTab('posts')}
              className={tab === 'posts' ? 'active' : ''}
            >
              📝 All Posts ({posts.length})
            </button>
          </div>

          {tab === 'users' && (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="no-data">No users found</td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span className={`status-badge ${u.status}`}>
                            {u.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => toggleStatus(u._id)}
                            className={u.status === 'active' ? 'btn-danger' : 'btn-success'}
                          >
                            {u.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'posts' && (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="no-data">No posts found</td>
                    </tr>
                  ) : (
                    posts.map((p) => (
                      <tr key={p._id}>
                        <td>{p.title}</td>
                        <td>{p.author?.name || 'Unknown'}</td>
                        <td>
                          <span className={`status-badge ${p.status}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          {p.status === 'published' && (
                            <button
                              className="btn-danger"
                              onClick={() => removePost(p._id)}
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;