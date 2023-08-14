import React, { useEffect } from "react";
import styled from "styled-components";
import { Tabs as AntTabs } from "antd";
import Products from "./Products";
import Achievers from "./Achievers";
import Business from "./Business";
import Users from "./Users";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StyledTabs = styled(AntTabs)`
  .ant-tabs-nav {
    margin-top: 2.5%;

    text-align: center;
  }
  @media screen and (max-width: 768px) {
    margin-top: 6%;
  }
  .ant-tabs-tab {
    font-size: 1.2em;
    padding: 1em;
    color: indigo;
  }
  .ant-tabs-tab-active {
    font-weight: bold;

    color: #d90429;
  }
`;

const StyledTabPane = styled(AntTabs.TabPane)`
  padding: 2em;
  border-radius: 5px;
`;

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  });

  return (
    <>
      <div>
        <StyledTabs>
          <StyledTabPane tab="Achievers" key="1">
            <Achievers />
          </StyledTabPane>
          <StyledTabPane tab="News" key="2">
            <Products />
          </StyledTabPane>
          <StyledTabPane tab="Admins" key="3">
            <Users />
          </StyledTabPane>
          <StyledTabPane tab="Events" key="4">
            Events will be available soon
          </StyledTabPane>
          <StyledTabPane tab="Business" key="5">
            <Business />
          </StyledTabPane>
          <StyledTabPane tab="Team" key="6">
            Teams will be available soon
          </StyledTabPane>
        </StyledTabs>
      </div>
    </>
  );
}

export default Admin;
