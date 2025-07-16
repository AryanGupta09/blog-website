import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/admin');
      if (response.data.success) {
        setDashboardData(response.data.dashboard);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprovePost = async (postId) => {
    try {
      await axios.put(`/admin/posts/${postId}/approve`);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error approving post:', error);
      alert('Failed to approve post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/admin/posts/${postId}`);
        fetchDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleApproveComment = async (commentId) => {
    try {
      await axios.put(`/admin/comments/${commentId}/approve`);
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error approving comment:', error);
      alert('Failed to approve comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`/admin/comments/${commentId}`);
        fetchDashboardData(); // Refresh data
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

  if (!dashboardData) {
    return (
      <div className="alert alert-danger">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12">
        <h1 className="mb-4">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-white bg-primary">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text display-6">{dashboardData.stats.totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-warning">
              <div className="card-body">
                <h5 className="card-title">Pending Posts</h5>
                <p className="card-text display-6">{dashboardData.stats.pendingPosts}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-info">
              <div className="card-body">
                <h5 className="card-title">Pending Comments</h5>
                <p className="card-text display-6">{dashboardData.stats.pendingComments}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-white bg-success">
              <div className="card-body">
                <h5 className="card-title">Published Posts</h5>
                <p className="card-text display-6">{dashboardData.posts?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'pending-posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending-posts')}
            >
              Pending Posts ({dashboardData.pendingPosts?.length || 0})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'pending-comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending-comments')}
            >
              Pending Comments ({dashboardData.pendingComments?.length || 0})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users ({dashboardData.users?.length || 0})
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row">
              <div className="col-md-6">
                <h4>Recent Pending Posts</h4>
                {dashboardData.pendingPosts?.slice(0, 3).map((post) => (
                  <div key={post._id} className="card mb-2">
                    <div className="card-body">
                      <h6 className="card-title">{post.title}</h6>
                      <p className="card-text small">By {post.author.username}</p>
                      <div className="btn-group btn-group-sm">
                        <button
                          onClick={() => handleApprovePost(post._id)}
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h4>Recent Pending Comments</h4>
                {dashboardData.pendingComments?.slice(0, 3).map((comment) => (
                  <div key={comment._id} className="card mb-2">
                    <div className="card-body">
                      <p className="card-text">{comment.content}</p>
                      <p className="card-text small">By {comment.author.username} on "{comment.post.title}"</p>
                      <div className="btn-group btn-group-sm">
                        <button
                          onClick={() => handleApproveComment(comment._id)}
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Posts Tab */}
          {activeTab === 'pending-posts' && (
            <div>
              <h4>Pending Posts</h4>
              {dashboardData.pendingPosts?.length === 0 ? (
                <div className="alert alert-info">No pending posts.</div>
              ) : (
                dashboardData.pendingPosts?.map((post) => (
                  <div key={post._id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content.substring(0, 200)}...</p>
                      <p className="card-text small">By {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}</p>
                      <div className="btn-group">
                        <button
                          onClick={() => handleApprovePost(post._id)}
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pending Comments Tab */}
          {activeTab === 'pending-comments' && (
            <div>
              <h4>Pending Comments</h4>
              {dashboardData.pendingComments?.length === 0 ? (
                <div className="alert alert-info">No pending comments.</div>
              ) : (
                dashboardData.pendingComments?.map((comment) => (
                  <div key={comment._id} className="card mb-3">
                    <div className="card-body">
                      <p className="card-text">{comment.content}</p>
                      <p className="card-text small">By {comment.author.username} on "{comment.post.title}" • {new Date(comment.createdAt).toLocaleDateString()}</p>
                      <div className="btn-group">
                        <button
                          onClick={() => handleApproveComment(comment._id)}
                          className="btn btn-success"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h4>All Users</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.users?.map((user) => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 