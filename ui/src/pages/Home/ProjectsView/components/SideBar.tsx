import styled from "@emotion/styled";
import React from "react";
import Theme from "styles/theme";

export const SideBar = (props: any) => (
  <SideBarView>
    <Menu>
      {props.children}
      <ALink>Link 1</ALink>
      <ALink>Link 2</ALink>
      <ALink>Link 3</ALink>
      <ALink>Link 4</ALink>
    </Menu>
  </SideBarView>
);

const SideBarView = styled.header`
  float: left;
  border: 2px solid ${Theme.colors.border};
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;

const Menu = styled.header`
  text-align: center;
  padding-right: 10px;
  header & div {
    background-color: ${Theme.colors.pageBg};
    padding: 8px;
    margin-top: 7px;

    display: block;
    width: 100%;
    color: ${Theme.colors.textPrimary};
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
