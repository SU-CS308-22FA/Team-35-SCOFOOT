import React from "react";
import Login from "./screens/Login/Login";
import SignUp from "./screens/Sign-Up/SignUp";
import Home from "./screens/Home/Home";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const App = () => {
    return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    );
}

export default App;