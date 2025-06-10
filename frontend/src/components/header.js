import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const loggedIn = !!localStorage.getItem('token');
  return (
    <header>
      <Link to="/">Home</Link>
      {loggedIn ? <a onClick={() => { localStorage.clear(); window.location = '/'; }}>Logout</a> :
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      }
    </header>
  );
}

export default Header;
