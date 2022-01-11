import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserStatus from "./UserStatus";
import BreadCrumbs from "./BreadCrumbs";

import { NAVIGATION_ROUTES } from "../../constants/navigation";
import React from "react";
import { Nav, HeaderBar } from "./styles";

const Header: React.FC = () => {
  return (
    <header>
      <HeaderBar>TodoApp</HeaderBar>
      <Nav>
        <Link to={NAVIGATION_ROUTES.HOME}>
          <h1>Home</h1>
        </Link>
        <BreadCrumbs />
        <SearchBar />
        <UserStatus />
      </Nav>
    </header>
  );
};

export default Header;
