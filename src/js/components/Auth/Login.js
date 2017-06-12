import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/actions';


import Form from './Form';

const Login = ({ user, login }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { email: { value: email }, password: { value: password } } = e.target;
    login({ email, password });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      {user.user.token && <Redirect to="/" />}
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, { login })(Login);
