import React from "react";
import { NavigationLink } from "../Components/StyledComponents/NavMenu";
import "./Forbidden.css";
const Forbidden = () => {
  return (
    <div className="wrapper">
      <div className="box">
        <h1>403</h1>
        <p>Sorry, it's not allowed to go beyond this point!</p>
        <p>
          <NavigationLink className="nav-link" to="/">
            Please, go back this way.
          </NavigationLink>
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
