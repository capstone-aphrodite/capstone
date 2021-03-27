import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../Store';

export function Navbar({handleClick, isLoggedIn}) {
  return (
    <div>
      <nav id="nav">
        <Link to="/">
          <FontAwesomeIcon id="home" icon={faHome} />
        </Link>
        {isLoggedIn ? <button onClick={handleClick}>
          Logout</button>
        : <Redirect to='/'/>}
      </nav>
    </div>
  );
}

const mapState = state => {
  return {
    isLoggedIn: !!state.firstName
  }
}
const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}