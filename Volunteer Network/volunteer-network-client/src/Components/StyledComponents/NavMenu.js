import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavMenu = styled(Nav)`
  margin-left: auto;
  display: flex;
  align-items: center;
  @media (min-width: 992px) {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const NavigationLink = styled(NavLink)`
  margin-right: 0.5rem;
  font-weight: bold;
`;
