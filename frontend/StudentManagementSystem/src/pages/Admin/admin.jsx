import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Students from '../../components/Students/Students';
import Classes from '../../components/Classes/Classes';
import Teachers from '../../components/Teachers/Teachers';
import Attendance from '../../components/Attendance/Attendance';
import Reports from '../../components/Reports/Reports';
import Settings from '../../components/Settings/Settings';
import './admin.css';
import {
  FaChartLine,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaCalendarCheck,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

const Admin = () => {
  const [activeBtn, setActiveBtn] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const renderMain = () => {
    switch (activeBtn) {
      case "Dashboard":
        return <Dashboard />;
      case "Students":
        return <Students />;
      case "Classes":
        return <Classes />;
      case "Teachers":
        return <Teachers />;
      case "Attendance":
        return <Attendance />;
      case "Reports":
        return <Reports />;
      case "Settings":
        return <Settings />;
      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>{collapsed ? 'SMS' : 'Student Management'}</h2>
          <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <div className="sidebar-menu">
          <div className={`menu-item ${activeBtn === "Dashboard" ? "active" : ""}`} onClick={() => setActiveBtn("Dashboard")}>
            <FaChartLine />
            {!collapsed && <span>Dashboard</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Students" ? "active" : ""}`}  onClick={() => setActiveBtn("Students")}>
            <FaUserGraduate />
            {!collapsed && <span>Students</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Classes" ? "active" : ""}`}  onClick={() => setActiveBtn("Classes")}>
            <FaChalkboardTeacher />
            {!collapsed && <span>Classes</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Teachers" ? "active" : ""}`}  onClick={() => setActiveBtn("Teachers")}>
            <FaUserTie />
            {!collapsed && <span>Teachers</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Attendance" ? "active" : ""}`}  onClick={() => setActiveBtn("Attendance")}>
            <FaCalendarCheck />
            {!collapsed && <span>Attendance</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Reports" ? "active" : ""}`}  onClick={() => setActiveBtn("Reports")}>
            <FaFileAlt />
            {!collapsed && <span>Reports</span>}
          </div>
          <div className={`menu-item ${activeBtn === "Settings" ? "active" : ""}`}  onClick={() => setActiveBtn("Settings")}>
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="main-header">
          <h1>Student Management System</h1>
          <div className="user-info">
            <span>Admin User</span>
            <img src="/api/placeholder/40/40" alt="Admin Avatar" className="avatar" />
          </div>
        </div>
        <div className="content-container">
          {renderMain()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
