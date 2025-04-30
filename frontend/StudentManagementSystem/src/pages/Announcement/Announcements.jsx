
// Announcements.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaNewspaper, FaFileAlt, FaTrophy, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import './Announcements.css';

const Announcements = () => {
  const [activeCategory, setActiveCategory] = useState('notices');
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch documents
    setLoading(true);

    fetch('http://localhost:8000/school/api/retrieve-reports/')
      .then(response => response.json())
      .then(data => {
        setDocuments(data.reports);  // set the fetched reports
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents
  .filter(doc => doc.category.toLowerCase() === activeCategory.toLowerCase())
  .filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDownload = (file) => {
    // In a real application, this would initiate a file download
    // For now, just show an alert
    alert(`Downloading ${file}...`);
    // In a real implementation:
    // window.open(`/api/documents/download/${file}`, '_blank');
  };

  return (
    <div className="announcements-container">
      {/* Header */}
      <header className="announcements-header">
        <div className="logo">
          <FaGraduationCap />
          <h1>SKR HS School</h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/announcements" className="active">Announcements</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="announcements-main">
        <div className="announcements-title">
          <h1>School Announcements & Documents</h1>
          <p>Access all school notices, results, circulars, and event information</p>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-tabs">
            <button
              className={activeCategory === 'notices' ? 'active' : ''}
              onClick={() => handleCategoryChange('notices')}
            >
              <FaNewspaper /> Notices
            </button>
            <button
              className={activeCategory === 'results' ? 'active' : ''}
              onClick={() => handleCategoryChange('results')}
            >
              <FaTrophy /> Results
            </button>
            <button
              className={activeCategory === 'circulars' ? 'active' : ''}
              onClick={() => handleCategoryChange('circulars')}
            >
              <FaFileAlt /> Circulars
            </button>
            <button
              className={activeCategory === 'events' ? 'active' : ''}
              onClick={() => handleCategoryChange('events')}
            >
              <FaCalendarAlt /> Events
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="documents-section">
          <h2>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>

          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : filteredDocuments.length > 0 ? (
            <div className="documents-list">
              {filteredDocuments.map(doc => (
                <div className="document-card" key={doc.id}>
                  <div className="document-info">
                    <h3>{doc.title}</h3>
                    <p>Published: {new Date(doc.date).toLocaleDateString()}</p>
                  </div>
                  <button
                    className="download-button"
                    onClick={() => handleDownload(doc.file)}
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-documents">
              <p>No documents found. Please try a different search term or category.</p>
            </div>
          )}
        </div>
      </main>

      {/* PDF Viewer Modal (could be added for viewing PDFs inline) */}
      {/* This would be implemented in a real application */}

      {/* Footer */}
      <footer className="announcements-footer">
        <p>&copy; 2025 SKR HS School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Announcements;