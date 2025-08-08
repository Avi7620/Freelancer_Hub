import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Browse Jobs", path: "/jobs" },
  { label: "Users", path: "/users" },
  { label: "Blog", path: "/blog" },
  { label: "Pages", path: "/pages" },
];

const Navbar = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path, withDelay = false) => {
    if (withDelay) setLoading(true);

    setTimeout(
      () => {
        navigate(path);
        if (withDelay) setLoading(false);
        setMobileMenuAnchor(null);
      },
      withDelay ? 1000 : 0
    );
  };

  if (loading) return <Spinner />;

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: "-0.5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Freelancer Hub
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                sx={{ color: "text.primary" }}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, ml: 2 }}>
            <Button variant="outlined" color="primary">
              Become a Seller
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigation("/signup", true)}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <IconButton
            size="large"
            aria-label="menu"
            onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={() => setMobileMenuAnchor(null)}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={() => handleNavigation("/login")}>
              Login
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/register", true)}>
              Sign Up
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
