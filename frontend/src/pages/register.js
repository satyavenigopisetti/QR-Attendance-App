import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // call backend register API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
