import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = ({ user, setUser, setToken }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = "http://localhost:8000"
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            // const token = data.token;
            const { token, role } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            console.log(token);
            setToken(token);
            setUser(data);

            // if(role === 'Admin'){
            //     navigate("/dashboard");
            // } else {
            //     navigate("/client");
            // }
            navigate("/dashboard");
        })
        .catch((error) => {
        console.error('Error logging in:', error);
        })

  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register"><p>New User? Click here to register!</p></Link>
    </div>
  );
};

export default Login;
