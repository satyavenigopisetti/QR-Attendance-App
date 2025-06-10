import React, { useState } from 'react';
import { login } from '../services/api';
import { setToken } from '../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      setToken(data.token);
      window.location = data.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

