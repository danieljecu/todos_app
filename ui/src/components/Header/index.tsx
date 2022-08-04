import { css } from "@emotion/css";

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserStatus from "./UserStatus";
import BreadCrumbs from "./BreadCrumbs";

import { NAVIGATION_ROUTES } from "../../constants/navigation";
import React from "react";
import { Nav, HeaderBar } from "./styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const NewResponsiveHeader: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Container
        maxWidth="xl"
        // className={css`
        //   display: flex;
        //   flex-direction: row;
        //   justify-content: space-around;
        // `}
      >
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={NAVIGATION_ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Todos
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {["Products", "Pricing", "Blog"].map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {["Products", "Pricing", "Blog"].map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <SearchBar />
          <UserStatus />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Header: React.FC = () => {
  return (
    <header>
      <HeaderBar>TodoApp</HeaderBar>
      <NewResponsiveHeader />
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
