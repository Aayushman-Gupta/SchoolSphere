import { useState } from "react";
import { User, UserCircle, Mail, Phone, Home, Calendar, Image, School, BadgeCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    gender: "Male", // Capitalized to match backend expectations
    phone: "",
    dob: "",
    class_field: "",
    address: "",
    section: "",
    image: null,
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    teacherId: "" // Keep for teacher functionality
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);

    try {
      let endpoint = '';

      if (isLogin) {
        endpoint = userType === 'student'
          ? 'http://localhost:8000/auth/s/login/'
          : 'http://localhost:8000/auth/t/login/';
      } else {
        endpoint = userType === 'student'
          ? 'http://localhost:8000/auth/s/register/'
          : 'http://localhost:8000/auth/t/register/';
      }

      const formToSend = new FormData();

      for (const key in formData) {
        if (formData[key]) {
          formToSend.append(key, formData[key]);
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server validation errors:", errorData);
        throw new Error(`Server error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Response from server:', data);

      if ( data.refresh && data.access) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
      }

      // alert(`${isLogin ? 'Login' : 'Registration'} successful!`);

      navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="register-subtitle">
            {isLogin
              ? "Sign in to access your account"
              : "Please fill out the information below"}
          </p>
        </div>

        <div className="register-body">
          {/* Toggle between Login and Register */}
          <div className="form-toggle">
            <button
              type="button"
              className={`toggle-btn ${isLogin ? "toggle-btn-active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`toggle-btn ${!isLogin ? "toggle-btn-active" : ""}`}
            >
              Register
            </button>
          </div>

          {/* User Type Selection (only for registration) */}
          {!isLogin && (
            <div className="user-type-container">
              <label className="form-label">
                I am a:
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === "student"}
                    onChange={() => setUserType("student")}
                    className="radio-input"
                  />
                  <span className="radio-text">Student</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="userType"
                    value="teacher"
                    checked={userType === "teacher"}
                    onChange={() => setUserType("teacher")}
                    className="radio-input"
                  />
                  <span className="radio-text">Teacher</span>
                </label>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="register-form">
            {/* Login Form */}
            {isLogin && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Username
                  </label>
                  <div className="input-with-icon">
                    <div className="input-icon">
                      <User className="icon" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password
                  </label>
                  <div className="input-with-icon">
                    <div className="input-icon">
                      <BadgeCheck className="icon" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Registration Form */}
            {!isLogin && (
              <>
                {/* Common fields for both student and teacher */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Username
                    </label>
                    <div className="input-with-icon">
                      <div className="input-icon">
                        <User className="icon" />
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Password
                    </label>
                    <div className="input-with-icon">
                      <div className="input-icon">
                        <BadgeCheck className="icon" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      First Name
                    </label>
                    <div className="input-with-icon">
                      <div className="input-icon">
                        <UserCircle className="icon" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Last Name
                    </label>
                    <div className="input-with-icon">
                      <div className="input-icon">
                        <UserCircle className="icon" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Student-specific fields */}
                  {userType === "student" && (
                    <>
                      <div className="form-group">
                        <label className="form-label">
                          Student ID
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <BadgeCheck className="icon" />
                          </div>
                          <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="form-select"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Phone Number
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Phone className="icon" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Date of Birth
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Calendar className="icon" />
                          </div>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Class
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <School className="icon" />
                          </div>
                          <input
                            type="text"
                            name="class_field"
                            value={formData.class_field}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Section (Optional)
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <School className="icon" />
                          </div>
                          <input
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Email
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Mail className="icon" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Address
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Home className="icon" />
                          </div>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Parent fields (now integrated) */}
                      <div className="form-group">
                        <label className="form-label">
                          Father's Name
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <UserRound className="icon" />
                          </div>
                          <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Mother's Name
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <UserRound className="icon" />
                          </div>
                          <input
                            type="text"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Father's Phone
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Phone className="icon" />
                          </div>
                          <input
                            type="tel"
                            name="fatherPhone"
                            value={formData.fatherPhone}
                            onChange={handleChange}
                            required
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">
                          Profile Image
                        </label>
                        <div className="input-with-icon">
                          <div className="input-icon">
                            <Image className="icon" />
                          </div>
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Teacher-specific fields */}
                  {userType === "teacher" && (
                    <div className="form-group full-width">
                      <label className="form-label">
                        Teacher ID
                      </label>
                      <div className="input-with-icon">
                        <div className="input-icon">
                          <BadgeCheck className="icon" />
                        </div>
                        <input
                          type="text"
                          name="teacherId"
                          value={formData.teacherId}
                          onChange={handleChange}
                          required
                          className="form-input"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="form-submit">
              <button
                className="submit-btn"
                type="submit"
              >
                {isLogin ? "Sign in" : "Register"}
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p className="form-footer-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="form-footer-link"
              >
                {isLogin ? "Register" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}