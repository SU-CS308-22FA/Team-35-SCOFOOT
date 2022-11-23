import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/system";
import { lightGreen } from "@mui/material/colors";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [navigate, userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">SCOFOOT</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto"></Nav>
            <Nav>
              {userInfo ? (
                <>
                  <>
                    <Nav.Link href="/teams">Teams</Nav.Link>
                    <Nav.Link href="/players">Players</Nav.Link>
                    <Nav.Link href="/teaminfo">Team Info</Nav.Link>
                    <Nav.Link href="/playerinfo">Player Info</Nav.Link>
                  </>
                  <NavDropdown
                    title={`${userInfo.name}`}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      My Profile
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
        </Container>
      </Navbar>
    </ThemeProvider>
  );
}

export default Header;
