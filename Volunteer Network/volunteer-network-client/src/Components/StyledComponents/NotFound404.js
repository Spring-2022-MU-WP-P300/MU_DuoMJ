import styled from "styled-components";
import { NavLink } from "react-router-dom";
export const Page404Container = styled.section`
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
`;

export const Page404Bg = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
  width: 75%;
  margin: 0 auto;
`;

export const Page404Title = styled.h1`
  font-size: 80px;
  text-align: center;
`;

export const Page404Content = styled.div`
  margin-top: -50px;
`;

export const Page404SubTitle = styled.h2`
  font-size: 30px;
`;

export const Page404Link = styled(NavLink)`
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
  text-decoration: none;
`;

export const Page404SubContainer = styled.div`
  text-align: center;
`;
