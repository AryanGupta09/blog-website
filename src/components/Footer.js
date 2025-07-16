import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-light py-4 mt-5 border-top shadow-sm">
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div className="mb-2 mb-md-0">
        <span className="fw-bold">Blog App</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
      </div>
      <div>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-light me-3 text-decoration-none">
          <i className="bi bi-github"></i> GitHub
        </a>
        <a href="mailto:support@example.com" className="text-light text-decoration-none">
          <i className="bi bi-envelope"></i> Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer; 