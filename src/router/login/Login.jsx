import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from "../../assets/image-removebg-preview.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === 'admin') {
        navigate("/admin");
      } else if (data.role === 'user') {
        navigate("/");
      }

    } catch (err) {
      setError("Server bilan bog'lanishda xatolik");
    }
  };

  return (
    <div className='login'>
      <div className="login_left">
        <img src={logo} alt="logo" />
      </div>
      <div className="login_right">
        <h1>Log in</h1>
        <form className='login_form' onSubmit={handleLogin}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>Email kiriting</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Parol kiriting</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='login_btn' type="submit">Jo'natish</button>
        </form>
      </div>
    </div>
  );
}

export default Login;