import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import BreadCrumbs from "./BreadCrumbs";

import React from "react";
import {Nav,HeaderBar} from './styles';

export default function Header() {
  return (
    <header >
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
