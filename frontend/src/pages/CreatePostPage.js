// frontend/src/pages/CreatePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Header from '../components/Header';

const CreatePostPage = ({ toggleDarkMode, darkMode }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!title.trim()) {
      setError('Please enter a title for your post.');
      setLoading(false);
      return;
    }

    if (!body.trim()) {
      setError('Please write some content for your post.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) {
      formData.append('image', image);
    }

    try {
      await API.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create post. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="create-post-page">
        <div className="create-post-container">
          <div className="create-post-header">
            <h2>✍️ Create New Post</h2>
            <p>Share your thoughts, stories, and ideas with the community</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-post-form">
            {/* Title Section */}
            <div className="form-group">
              <label htmlFor="title">
                <span className="label-icon">📝</span>
                Post Title
                <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Give your post a catchy title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                disabled={loading}
                required
                autoFocus
                className="title-input"
              />
              <small className="input-hint">Be descriptive and engaging</small>
            </div>

            {/* Content Section */}
            <div className="form-group">
              <label htmlFor="body">
                <span className="label-icon">📄</span>
                Post Content
                <span className="required">*</span>
              </label>
              <textarea
                id="body"
                placeholder="Write your post content here... Use line breaks to separate paragraphs for better readability."
                value={body}
                onChange={e => setBody(e.target.value)}
                disabled={loading}
                required
                rows="12"
                className="content-textarea"
              />
              <small className="input-hint">
                💡 Tip: Use line breaks to create paragraphs and make your post easier to read
              </small>
            </div>

            {/* Image Upload Section */}
            <div className="form-group">
              <label htmlFor="image">
                <span className="label-icon">🖼️</span>
                Featured Image
                <span className="optional">(Optional)</span>
              </label>
              <div className="image-upload-area">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="file-input"
                />
                <div className="upload-instructions">
                  <span className="upload-icon">📸</span>
                  <p>Click or drag image to upload</p>
                  <small>Supports JPG, PNG, GIF (Max 5MB)</small>
                </div>
              </div>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="image-preview-container">
                  <div className="image-preview-header">
                    <span>Image Preview</span>
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/home')}
                className="btn-cancel"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Publishing...
                  </span>
                ) : (
                  <>
                    <span>🚀</span> Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;