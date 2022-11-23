import React from "react";
import Login from "./screens/Login/Login";
import SignUp from "./screens/Sign-Up/SignUp";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Header from "./components/Header/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Players from "./screens/Players/Players";
import Teams from "./screens/Teams/Teams";
import TeamsInfo from "./screens/TeamsInfo/TeamsInfo";
import PlayersInfo from "./screens/PlayersInfo/PlayersInfo";

const App = () => {
  return (
    // <div>
    //   <Teams></Teams>
    //   {/* <Players></Players> */}
    // </div>
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/teaminfo" element={<TeamsInfo />} />
        <Route path="/playerinfo" element={<PlayersInfo />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
