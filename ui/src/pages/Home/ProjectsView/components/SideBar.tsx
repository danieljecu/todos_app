import styled from "@emotion/styled";
import React from "react";

export const SideBar = () => (
  <SideBarView>
    <Menu>
      <ALink>Link 1</ALink>
      <ALink>Link 2</ALink>
      <ALink>Link 3</ALink>
      <ALink>Link 4</ALink>
    </Menu>
  </SideBarView>
);

const SideBarView = styled.header`
  float: left;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Menu = styled.header`
  text-align: center;
  padding-right: 10px;
  header & div {
    background-color: #e5e5e5;
    padding: 8px;
    margin-top: 7px;

    display: block;
    width: 100%;
    color: black;
  }
`;

const ALink = styled.div`
  /* background-color: #e5e5e5;
  padding: 8px;
  margin-top: 7px;
  display: block;
  width: 100%;
  color: black; */
`;
