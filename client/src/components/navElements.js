import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: indigo;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  position: fixed;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Logo = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: indigo;
    background-color: white;
    padding: 0 20px;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 50%;
  cursor: pointer;

  &.active {
    color: indigo;
    background-color: white;
    padding: 0 20px;
    font-weight: 600;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    font-weight: 600;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  position: fixed;

  @media screen and (max-width: 768px) {
    display: block;
    position: relative;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    z-index: 2;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    width: 90%;
    background-color: indigo;
    align-items: center;
    border-radius: 15px;
    margin-left: 5%;
    position: absolute;
    z-index: 999;
    top: 90px;
    left: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all 0.3s ease-in-out;

    a {
      align-items: center;
      justify-content: center;
      font-weight: 600;
      padding: 5px;
      color: #fff;
      margin: 7px 0;
      width: 40%;
      text-align: center;
    }
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  background-color: indigo;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 10px;
  background-color: indigo;
  padding: 0;
  height: 50%;
  padding: 5px 10px;
  color: #fff;
  outline: none;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: indigo;
  }
`;
