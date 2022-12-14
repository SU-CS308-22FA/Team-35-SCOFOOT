import React from "react";
import Login from "./screens/Login/Login";
import AdminProfile from "./screens/Profile/AdminProfile";
import SignUp from "./screens/Sign-Up/SignUp";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayersAndTeams from "./screens/Players/PlayersAndTeams";
import TeamsInfo from "./screens/TeamsInfo/TeamsInfo";
import PlayersInfo from "./screens/PlayersInfo/PlayersInfo";
import Verifications from "./screens/VerificationRequests/Verifications";

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
        <Route path="/admin_profile" element={<AdminProfile />} />
				<Route path="/verification" element={<Verifications />} />
        <Route path="/database" element={<PlayersAndTeams />} />
        <Route path="/teamInfo" element={<TeamsInfo />} />
        <Route path="/playerInfo" element={<PlayersInfo />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
