import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get('/posts?limit=5');
      if (response.data.success) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
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
      <div className="col-lg-8 mx-auto">
        <div className="text-center mb-5">
          <h1 className="display-4">Welcome to Our Blog</h1>
          <p className="lead">
            Discover amazing stories, insights, and ideas from our community of writers.
          </p>
          <Link to="/posts" className="btn btn-primary btn-lg">
            Browse All Posts
          </Link>
        </div>

        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Recent Posts</h2>
            {posts.length === 0 ? (
              <div className="alert alert-info">
                No posts available yet. Be the first to create one!
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">
                      <Link 
                        to={`/posts/${post._id}`} 
                        className="text-decoration-none"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="card-text">
                      {post.content.length > 200 
                        ? `${post.content.substring(0, 200)}...` 
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 