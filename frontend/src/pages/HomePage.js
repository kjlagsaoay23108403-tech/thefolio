// frontend/src/pages/HomePage.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import Header from '../components/Header';

const HomePage = ({ toggleDarkMode, darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layout, setLayout] = useState('grid'); // grid or list

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        const newPosts = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.posts)
          ? res.data.posts
          : [];
        setPosts(newPosts);
        setError(null);
      } catch (err) {
        console.error('Cannot load posts', err);
        setError('Failed to load posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="loading">Loading posts...</div>
    </>
  );
  
  if (error) return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="error-message">{error}</div>
    </>
  );

  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="home-page">
        <div className="home-header">
          <h2>Latest Posts</h2>
          <div className="layout-controls">
            <button 
              onClick={() => setLayout('grid')} 
              className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
              title="Grid View"
            >
              ⊞ Grid
            </button>
            <button 
              onClick={() => setLayout('list')} 
              className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
              title="List View"
            >
              ☰ List
            </button>
          </div>
        </div>

        {safePosts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          <div className={`posts-container ${layout}`}>
            {safePosts.map((post, index) => (
              <div key={post._id} className="post-card" style={{ animationDelay: `${index * 0.1}s` }}>
                {post.image && (
                  <div className="post-image-wrapper">
                    <img
                      src={`http://localhost:5000/uploads/${post.image}`}
                      alt={post.title || 'Post image'}
                      className="post-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                    <div className="image-overlay">
                      <Link to={`/posts/${post._id}`} className="read-more-btn">
                        Read More
                      </Link>
                    </div>
                  </div>
                )}
                
                <div className="post-content">
                  <h3>
                    <Link to={`/posts/${post._id}`}>{post.title ?? 'Untitled'}</Link>
                  </h3>
                  
                  <div className="post-excerpt">
                    <p>{(post.body || '').substring(0, 120)}...</p>
                  </div>
                  
                  <div className="post-meta">
                    <div className="author-info">
                      <span className="author-avatar">
                        {post.author?.name?.charAt(0) || 'U'}
                      </span>
                      <span className="author-name">By {post.author?.name || 'Unknown'}</span>
                    </div>
                    <div className="post-date">
                      <span className="date-icon">📅</span>
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                    </div>
                  </div>
                  
                  <Link to={`/posts/${post._id}`} className="read-more-link">
                    Read Full Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;