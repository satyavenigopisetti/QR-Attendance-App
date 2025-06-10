import React, { useState } from 'react';
import { register } from '../services/api';

function Register() {
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered!');
      window.location = '/login';
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required/>
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required/>
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

