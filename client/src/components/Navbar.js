import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  BiSolidHome,
  BiSolidUserRectangle,
  BiSolidNews,
  BiSolidMedal,
  BiSolidGroup,
  BiSolidDashboard,
  BiLogIn,
} from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";

import { Nav, NavLink, NavBtnLink, Bars, NavMenu, Logo } from "./navElements";

function Navbar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { user } = useSelector((state) => state.users);

  return (
    <>
      <Nav>
        <Logo
          style={{ background: "none", boxShadow: "none", marginLeft: "25px" }}
          to="/admin"
        >
          <img
            style={{ marginLeft: "40px" }}
            width="35px"
            src="https://res.cloudinary.com/sbcunueh/image/upload/v1690485937/logo1_d6qizj.png"
            alt="AS Group Logo"
          />
        </Logo>
        <Bars
          onClick={toggle}
          style={{ marginRight: "40px", marginTop: "6px" }}
        />
        <NavMenu isOpen={isOpen}>
          <NavLink to="/" activeStyled>
            <BiSolidHome style={{ marginRight: "5px" }} />
            Home
          </NavLink>
          <NavLink to="/about" activeStyled>
            <BiSolidUserRectangle style={{ marginRight: "5px" }} />
            About
          </NavLink>

          <NavLink to="/news" activeStyled>
            <BiSolidNews style={{ marginRight: "5px" }} />
            News
          </NavLink>

          <NavLink to="/business" activeStyled>
            <BsGraphUpArrow style={{ marginRight: "5px" }} />
            Business
          </NavLink>

          <NavLink to="/achievers" activeStyled>
            <BiSolidMedal style={{ marginRight: "5px" }} />
            Achievers
          </NavLink>
          <NavLink to="/team" activeStyled>
            <BiSolidGroup style={{ marginRight: "5px" }} />
            Team
          </NavLink>

          <NavBtnLink to="/admin">
            {user ? (
              <BiSolidDashboard style={{ marginRight: "5px" }} />
            ) : (
              <BiLogIn style={{ marginRight: "5px" }} />
            )}

            {user ? "Dashboard" : "Login"}
          </NavBtnLink>
        </NavMenu>
      </Nav>
      <div>{children}</div>
    </>
  );
}

export default Navbar;
