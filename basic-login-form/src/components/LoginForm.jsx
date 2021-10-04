import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateLogin from '../actions/validateLogin';
import HomePage from './HomePage';
import { TextField, Button } from "@material-ui/core";

const LoginForm = ({
  isAuthenticated,
  actionValidateLogin,
}) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('')

  const inputOnchange = ({ target: {
      id: fieldId,
      value: fieldValue,
  } }) => {
      if (fieldId === 'email') {
          setUserName(fieldValue);
      }

      if (fieldId === 'password') {
          setPassword(fieldValue);
      }
  }

  const onFormSubmit = (event) => {
      event.preventDefault();
      if(userName && password !== ''){
      actionValidateLogin({
        userName,
        password
      })
    }
    if(!isAuthenticated){
      setError("Please enter the correct username and Password")

    }
  }

  return (
    isAuthenticated ? <HomePage /> : (
      <div className="container w-25 pt-3">
        {error? <p className="error">{error}</p>: ''}
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" > UserName </label >
                <TextField
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={inputOnchange}
                />
            </div >
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <TextField
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={inputOnchange}
                />
            </div>
            <Button color="primary"
              variant="contained"
              type="submit" className="btn btn-primary" data-testid='loginFormBtn'>Submit</Button>
        </form >
      </div >
    )
  )
}

LoginForm.propTypes = {
  actionValidateLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.login.isAuth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionValidateLogin: (form) => dispatch(validateLogin(form))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);