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
import AllFollowingRequests from "./screens/UserProfilePage/AllFollowingRequestsPage";
import { FavPlayers } from "./components/FavoritePlayers/FavPlayers";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import Dashboard from "./screens/Dashboard/Dashboard";
import Feed from "./components/Feed";
import UserProfilePage from "./screens/UserProfilePage/UserProfilePage" ;
import ConnectionPage from "./components/ProfilePage/connections";
import ReportPage from "./screens/Report/Report";

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
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<Home />} />
        <Route path= "/favorites" element={<FavPlayers/>} />
        <Route path= "/userProfile" element={<UserProfilePage/> } />
        <Route path= "/followingRequests" element={<AllFollowingRequests/>} />
        <Route path= "/connections" element={<ConnectionPage/>} />
        <Route path= "/report" element={<ReportPage/>} />

      </Routes>
    </Router>
  );
};

export default App;
