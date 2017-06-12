import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import fedexlogo from '../../assets/images/fedex-logo.svg';


const Header = () => { 
  return (
    <nav className="navbar navbar-toggleable-md">
      <Link to="/" className="navbar-brand"><img src={fedexlogo} alt="fedexlogo" width="160" /></Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="selected">Home</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
