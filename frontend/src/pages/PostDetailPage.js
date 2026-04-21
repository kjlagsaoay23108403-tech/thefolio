// frontend/src/pages/PostDetailPage.js
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PostDetailPage = ({ toggleDarkMode, darkMode }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
        setError(null);
      } catch (err) {
        console.error('Cannot load post', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <div className="loading">Loading post...</div>
      </main>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <div className="error-message">{error}</div>
        <Link to="/home" className="btn-primary">Back to Home</Link>
      </main>
      <Footer />
    </>
  );

  if (!post) return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <div className="error-message">Post not found.</div>
        <Link to="/home" className="btn-primary">Back to Home</Link>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main>
        <div className="post-detail">
          <Link to="/home" className="back-link">← Back to Home</Link>
          <article className="post-content">
            <h1>{post.title || 'Untitled'}</h1>
            {post.image && (
              <img
                 src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/uploads/${post.image}`}
                alt={post.title || 'Post image'}
                className="post-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="post-body">
              {post.body ? post.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )) : <p>No content available.</p>}
            </div>
            <div className="post-meta">
              <small>
                By {post.author?.name === 'TheFolio Admin' ? 'the Admin' : post.author?.name || 'Unknown'} ·{' '}
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
              </small>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostDetailPage;