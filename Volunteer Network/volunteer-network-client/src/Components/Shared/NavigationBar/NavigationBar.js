import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../../images/logo.png";
import { Logo, LogoContainer, LogoImage } from "../../StyledComponents/Logo";
import { NavigationLink, NavMenu } from "../../StyledComponents/NavMenu";
const NavigationBar = () => {
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
          </NavMenu>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
