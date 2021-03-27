import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../Store';

export function Navbar({handleClick}) {
  return (
    <div>
      <nav id="nav">
        <Link to="/">
          <FontAwesomeIcon id="home" icon={faHome} />
        </Link>
        <Link to='/' onClick={handleClick}>
          Logout
        </Link>
      </nav>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    handleClick: () => dispatch(logout())
  }
}

export default connect(null, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}