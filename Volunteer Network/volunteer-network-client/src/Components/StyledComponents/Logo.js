import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
export const Logo = styled(NavLink)`
  width: 25%;
  @media only screen and (max-width: 768px) {
    width: 40%;
  }
`;

export const LogoContainer = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  width: 75%;
  font-weight: bold;
`;

export const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-right: 1rem !important;
`;
