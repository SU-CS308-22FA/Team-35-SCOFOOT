import React, { useEffect , useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/system";
import { lightGreen } from "@mui/material/colors";
import { Box } from "@mui/material";
import { Input } from '@mui/material';
import SearchBar from "../../components/SearchBar/SearchBar";
import { seeAllUsers } from "../../actions/userActions";

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const allUsers = useSelector((state) => state.allUsers );

  useEffect(()=>{
    dispatch(seeAllUsers());
  },[])


  
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [navigate, userInfo]);

  
  

  return (
    
    <ThemeProvider theme={theme}>
      <Navbar
        className="px-4"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Navbar.Brand href="/">SCOFOOT</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto"></Nav>
          <Nav>
          <SearchBar placeholder="Enter a User..." data={allUsers.usersData} /> 
          <Nav.Link href="/database">Players & Teams</Nav.Link>
            {userInfo ? (
              <>
                        
                <Nav.Link href="/profilepage">My Profile </Nav.Link>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">Settings</NavDropdown.Item>

                  <NavDropdown.Divider />
                  {
                    userInfo.accountType && userInfo.accountType === 1 ? 
                    (
                      <>
                        <NavDropdown.Item onClick={() => navigate("/playerInfo", {state: {id : userInfo.playerProfile, isOwner: true}})}>
                          Player Profile Page  
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </>
                    )
                    :
                    <></>
                  }
                  <NavDropdown.Item href="/dashboard">
                    Dashboard  
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </ThemeProvider>
  );
}

export default Header;
