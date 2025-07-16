import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${id}`);
      if (response.data.success) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/posts/${id}/comments`);
      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await axios.post(`/posts/${id}/comments`, {
        content: commentContent
      });
      
      if (response.data.success) {
        setCommentContent('');
        fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`/posts/${id}/comments/${commentId}`);
        fetchComments(); // Refresh comments
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="alert alert-danger">
        Post not found.
        <Link to="/posts" className="alert-link ms-2">Back to posts</Link>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        {/* Post Content */}
        <article className="mb-5">
          <header className="mb-4">
            <h1 className="display-4">{post.title}</h1>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <span className={`badge ${post.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                {post.status}
              </span>
            </div>
          </header>
          
          <div className="post-content">
            <p className="lead">{post.content}</p>
          </div>

          {user && (user.id === post.author._id || user.role === 'admin') && (
            <div className="mt-4">
              <div className="btn-group" role="group">
                <Link 
                  to={`/posts/${post._id}/edit`} 
                  className="btn btn-outline-primary"
                >
                  Edit Post
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      axios.delete(`/posts/${post._id}`).then(() => {
                        navigate('/posts');
                      }).catch(error => {
                        console.error('Error deleting post:', error);
                        alert('Failed to delete post');
                      });
                    }
                  }}
                  className="btn btn-outline-danger"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </article>

        {/* Comments Section */}
        <section className="comments-section">
          <h3>Comments ({comments.length})</h3>
          
          {/* Add Comment Form */}
          {user && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Add a Comment</h5>
                <form onSubmit={handleSubmitComment}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your comment..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submittingComment || !commentContent.trim()}
                  >
                    {submittingComment ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Comment'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="alert alert-info">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <p className="card-text">{comment.content}</p>
                        <small className="text-muted">
                          By {comment.author.username} • {new Date(comment.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      
                      {user && (user.id === comment.author._id || user.role === 'admin') && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="btn btn-outline-danger btn-sm ms-2"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PostDetail; 