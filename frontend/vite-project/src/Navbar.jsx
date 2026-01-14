import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate=useNavigate()

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const logOut=async ()=>{
    localStorage.removeItem('token')
    navigate(-1)
    setTimeout(()=>{
       window.location.reload()
    },1000)
   

  }

  return (
    <AppBar position="fixed" sx={{ background: "white", color: "black" }}>
      <Toolbar>

        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Blogify
        </Typography>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button component={Link} to="/" sx={{ color: "black" }}>
            Home
          </Button>
          {localStorage.getItem('token')?<Button onClick={logOut}>Logout</Button>:<><Button component={Link} to="/login" sx={{ color: "black" }}>
            Login
          </Button>
          <Button component={Link} to="/register" sx={{ color: "black" }}>
            Register
          </Button></>}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem component={Link} to="/" onClick={handleCloseMenu}>
            Home
          </MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleCloseMenu}>
            Login
          </MenuItem>
          <MenuItem component={Link} to="/register" onClick={handleCloseMenu}>
            Register
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
