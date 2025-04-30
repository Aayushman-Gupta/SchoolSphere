// Home.jsx
import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaUserCircle,FaUsers, FaCalendarAlt, FaLaptop, FaBullhorn } from 'react-icons/fa';

const Home = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isLoggedIn, logout,login } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) login();
    // else logout();
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY - lastScrollY > 100) {
        // User scrolled down more than 40px (~4cm) → hide
        setHideHeader(true);
        setLastScrollY(window.scrollY);
      } else if (lastScrollY - window.scrollY > 40) {
        // User scrolled up more than 40px → show
        setHideHeader(false);
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);


  return (
    <div className="home-container">
      {/* Header */}
      <header className={`home-header ${hideHeader ? 'hide' : ''}`}>
        <div className='header-inner'>
          <div className="logo">
            <FaGraduationCap />
            <h1>SKR HS School</h1>
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/announcements">Announcements</Link></li>
            </ul>
          </nav>
          <div className="auth-buttons">
              {isLoggedIn ? (
                <div className="profile-menu">
                  <FaUserCircle size={28} style={{ cursor: 'pointer' }} />
                  <button onClick={logout} className="logout-button">Logout</button>
                </div>
              ) : (
               <a href="/register" className="register-button">Register</a>
              )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage:`url("https://scontent.fdel15-1.fna.fbcdn.net/v/t39.30808-6/487740994_1089146526591144_18358255285446912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bwSudmXBmIkQ7kNvwEFr5Or&_nc_oc=Adl1zBno9Prz_iArU6LItBjoMSKH_rVzrYP1uKNQv-9sRq9kDp0BSPbH8g0aK7c-zLg&_nc_zt=23&_nc_ht=scontent.fdel15-1.fna&_nc_gid=8e7DmT-gvMYpFSf6E9kZqQ&oh=00_AfE71-Oxt0bIaIYZlGvIFfseKrYS2l87_dvPufiwfSSL3w&oe=6815503D")` ,backgroundPosition: 'center top -50px' }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Sant Kanwar Ram HS School</h1>
            <h2>Empowering Education Through Technology</h2>
            <p>Our comprehensive student management system helps schools streamline administration, enhance communication, and improve learning outcomes.</p>
            <div className="hero-buttons">
              <a href="#features" className="secondary-button">Learn More</a>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2>About Our School</h2>
          <div className="divider"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>Sant Kanwar Ram school was established in 1962 with a mission to provide quality education that nurtures intellectual curiosity, creativity, and personal growth. Our commitment to academic excellence and holistic development has made us one of the leading educational institutions in the region.</p>
            <p>Our student management system is designed to support our educational philosophy by creating an efficient, transparent, and collaborative learning environment for students, teachers, and parents.</p>
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <h3>25+</h3>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Graduates</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Qualified Teachers</p>
            </div>
            <div className="stat-item">
              <h3>30+</h3>
              <p>Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Our Features</h2>
          <div className="divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Student Management</h3>
            <p>Comprehensive student profiles, enrollment tracking, and performance analytics.</p>
          </div>
          <div className="feature-card">
            <FaChalkboardTeacher className="feature-icon" />
            <h3>Teacher Portal</h3>
            <p>Tools for curriculum planning, grade management, and student assessment.</p>
          </div>
          <div className="feature-card">
            <FaBook className="feature-icon" />
            <h3>Academic Tracking</h3>
            <p>Track grades, assignments, and academic progress in real-time.</p>
          </div>
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Attendance System</h3>
            <p>Automated attendance tracking with notifications for parents.</p>
          </div>
          <div className="feature-card">
            <FaLaptop className="feature-icon" />
            <h3>Online Learning</h3>
            <p>Integrated e-learning platform with course materials and assignments.</p>
          </div>
          <div className="feature-card">
            <FaBullhorn className="feature-icon" />
            <h3>Announcements</h3>
            <p>Stay updated with school notices, results, and important documents.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2>What People Say</h2>
          <div className="divider"></div>
        </div>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The student management system has transformed how we track student progress. It's intuitive and provides valuable insights for both teachers and parents."</p>
            </div>
            <div className="testimonial-author">
              <img src="/api/placeholder/60/60" alt="Principal" className="author-image" />
              <div className="author-info">
                <h4>Dr. Sarah Johnson</h4>
                <p>School Principal</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"As a teacher, I appreciate how easy it is to manage attendance, grades, and communicate with parents. It saves me hours of administrative work every week."</p>
            </div>
            <div className="testimonial-author">
              <img src="/api/placeholder/60/60" alt="Teacher" className="author-image" />
              <div className="author-info">
                <h4>Robert Miller</h4>
                <p>Science Teacher</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"I can easily check my child's progress, attendance, and upcoming assignments. The parent portal has greatly improved my involvement in my daughter's education."</p>
            </div>
            <div className="testimonial-author">
              <img src="/api/placeholder/60/60" alt="Parent" className="author-image" />
              <div className="author-info">
                <h4>Jennifer Adams</h4>
                <p>Parent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <h2>Contact Us</h2>
          <div className="divider"></div>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>Have questions about our school or the student management system? Contact us and we'll get back to you as soon as possible.</p>
            <div className="contact-details">
              <p><strong>Address:</strong> 123 Education Lane, Academic City, AC 12345</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
              <p><strong>Email:</strong> info@skrhsschool.edu</p>
            </div>
            <div className="contact-hours">
              <h4>Office Hours</h4>
              <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
              <p>Saturday: 9:00 AM - 12:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="primary-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FaGraduationCap />
            <h2>SKR HS School</h2>
          </div>
          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><Link to="/announcements">Announcements</Link></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-links-column">
              <h3>Connect</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SKR HS School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;