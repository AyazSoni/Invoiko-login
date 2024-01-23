import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './SignIn.js';
import SignUp from './signup.js';

const Login = () => {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
    </Routes>
    </Router>
  );
};

export default Login;
