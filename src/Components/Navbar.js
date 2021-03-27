import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <div>
      <nav id="nav">
        <Link to="/">
          <FontAwesomeIcon id="home" icon={faHome} />
        </Link>
      </nav>
    </div>
  );
}
