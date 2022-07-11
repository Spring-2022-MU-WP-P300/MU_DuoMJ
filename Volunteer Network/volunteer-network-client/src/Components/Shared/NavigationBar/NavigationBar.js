import React from "react";
import { Navbar, Button, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import { LogoContainer, Logo, LogoImage } from "../../StyledComponents/Logo";
import { NavigationLink, NavMenu } from "../../StyledComponents/NavMenu";
import useAuth from "../../../hooks/useAuth";
const NavigationBar = () => {
  const navigate = useNavigate();
  const {
    currentUser: { displayName, photoURL },
    admin,
    handleLogout,
  } = useAuth();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Logo className="nav-link" to="/">
          <LogoContainer>
            <LogoImage src={logo} alt="logoImg" />
          </LogoContainer>
        </Logo>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav "
          className="shadow-none"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          <NavMenu navbarScroll>
            <NavigationLink className="nav-link" to="/home">
              Home
            </NavigationLink>
            <NavigationLink
              className="nav-link"
              to={`/registeredEvents/myEvents`}
            >
              My Events
            </NavigationLink>
            {admin && (
              <NavDropdown
                title="Admin"
                className="nav-link fw-bold me-2"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item as="div">
                  <NavigationLink className="nav-link" to="/addEvent">
                    Add Event
                  </NavigationLink>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <NavigationLink className="nav-link" to="/manageAllEvent">
                    Manage All Event
                  </NavigationLink>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <NavigationLink className="nav-link" to="/allRegisteredEvent">
                    Registered Events
                  </NavigationLink>
                </NavDropdown.Item>
                <NavDropdown.Item as="div">
                  <NavigationLink className="nav-link" to="/makeAdmin">
                    Make Admin
                  </NavigationLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {photoURL && (
              <img
                style={{ width: "40px", borderRadius: "50%" }}
                src={photoURL}
                loading="lazy"
                alt="img"
                referrerPolicy="no-referrer"
              />
            )}
            {displayName && (
              <span className="fw-bold me-2 px-1 py-2">{displayName}</span>
            )}
            {!displayName ? (
              <Link to="/login">
                <Button className="shadow-none" variant="primary">
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => [handleLogout(), navigate("/")]}
                variant="primary"
                className="shadow-none"
              >
                Log out
              </Button>
            )}
          </NavMenu>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
