import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts?page=${currentPage}&limit=10`);
      if (response.data.success) {
        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.pages);
        setTotalPosts(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/posts/${postId}`);
        fetchPosts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
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

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>All Posts</h1>
          {user && (
            <Link to="/posts/create" className="btn btn-primary">
              Create New Post
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="alert alert-info">
            No posts available yet.
            {user && (
              <Link to="/posts/create" className="alert-link ms-2">
                Create the first post!
              </Link>
            )}
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <div key={post._id} className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h3 className="card-title">
                        <Link 
                          to={`/posts/${post._id}`} 
                          className="text-decoration-none"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="card-text">
                        {post.content.length > 300 
                          ? `${post.content.substring(0, 300)}...` 
                          : post.content
                        }
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                        </small>
                        <span className={`badge ${post.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                    
                    {user && (user.id === post.author._id || user.role === 'admin') && (
                      <div className="ms-3">
                        <div className="btn-group" role="group">
                          <Link 
                            to={`/posts/${post._id}/edit`} 
                            className="btn btn-outline-primary btn-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Posts pagination">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}

            <div className="text-center text-muted">
              Showing {posts.length} of {totalPosts} posts
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostList; 