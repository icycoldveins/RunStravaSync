import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer"; // Import Drawer
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
const userSettings = ["Profile", "Logout"]; // User menu options
import ListItemIcon from "@mui/material/ListItemIcon";

export default function ButtonAppBar() {
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false); // State for drawer

  const handleUserMenuClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const drawerItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "About", icon: <InfoIcon /> },
    { text: "Contact", icon: <ContactMailIcon /> },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {/* Navigation Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)} // Toggle drawer
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RunStravaSync
          </Typography>

          {/* User Menu Icon */}
          <IconButton
            color="inherit"
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleUserMenuClick}
          >
            <Avatar alt="User" src="/path_to_profile_picture.jpg" />
          </IconButton>

          {/* User Menu */}
          <Menu
            id="user-menu"
            anchorEl={userAnchorEl}
            keepMounted
            open={Boolean(userAnchorEl)}
            onClose={handleClose}
          >
            {userSettings.map((setting, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {setting}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "black", // Dark background color
            color: "white", // Text color
            width: 200, // Adjusted width
          },
        }}
      >
        <List>
          {drawerItems.map((item, index) => (
            <ListItem button key={index} onClick={toggleDrawer(false)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
