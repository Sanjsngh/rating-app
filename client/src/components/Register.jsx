import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Client', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = "http://localhost:8000"
    fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data.message);
            navigate("/login");
          } else {
            console.error(data.error);
          }
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="username">Full Name</label> */}
          <input
            type="text"
            id="fullname"
            name="fullName"
            placeholder='Full Name '
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="text"
            id="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="phone">Phone</label> */}
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder='Phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="confirmpassword">Confirm Password</label> */}
          <input
            type="password"
            id="confirmpassword"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role: {" "}</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Client">Client</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
