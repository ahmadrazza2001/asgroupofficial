import React, { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import { Nav, NavLink, Logo, NavBtnLink, Bars, NavMenu } from "./navElements";
import { BsGraphUpArrow } from "react-icons/bs";

import { BiLogOut } from "react-icons/bi";
import {
  BiSolidHome,
  BiSolidUserRectangle,
  BiSolidNews,
  BiSolidMedal,
  BiSolidGroup,
} from "react-icons/bi";

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = useCallback(async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  }, [dispatch, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, [navigate, validateToken]);

  return (
    user && (
      <>
        <Nav>
          <Logo
            style={{
              background: "none",
              boxShadow: "none",
              marginLeft: "25px",
            }}
            to="/"
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
            <NavLink to="/news" activeStyled>
              <BiSolidGroup style={{ marginRight: "5px" }} />
              Team
            </NavLink>

            <NavBtnLink onClick={handleClick}>
              <BiLogOut style={{ fontSize: "20px", marginRight: "10px" }} />
              {user.name}
            </NavBtnLink>
          </NavMenu>
        </Nav>

        {/* body */}
        <div className="p-5">{children}</div>
      </>
    )
  );
}

export default ProtectedPage;
