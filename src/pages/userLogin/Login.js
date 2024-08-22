import React, { useState, useContext } from "react";import './Login.css';
import Logo from './Logo/Logo.js';
import LoginForm from './LoginForm/LoginForm.js';
import Bubble from './Bubble/Bubble.js';


function Login() {
  return (
    <div id="login-body">
      <div className="container-fluid" id="login-screen-container">
        <div className="row login-row">
          <Logo />
        </div>
        <div className="row login-row">
          <div className="col" id="login-col">
              <LoginForm />
          </div>
        </div>
      </div>
      <Bubble />
    </div>
  );
}

export default Login;