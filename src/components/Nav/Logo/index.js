import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";

import LogoImage from "../../../images/logo.png";

export default class Logo extends PureComponent {
  render() {
    return (
      <NavLink to="/">
        <img src={LogoImage} width="25px" alt="logo" />
      </NavLink>
    );
  }
}
