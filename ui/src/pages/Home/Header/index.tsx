import styled from "@emotion/styled";
// import styled from 'styled-components';

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import BreadCrumbs from "./BreadCrumbs";

const HeaderBar = styled.nav`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border: 2px solid #333;
  margin-bottom: 25px;
  padding-right: 10px;
`;
export default function Header() {
  return (
    <header>
      <HeaderBar>TodoApp</HeaderBar>

      <Nav>
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <BreadCrumbs />
        <SearchBar />
        <Link to="/login">login</Link>
      </Nav>

    </header>
  );
}
