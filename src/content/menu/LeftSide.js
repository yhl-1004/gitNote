import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;

function LeftSide(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [reactOpen, setReactOpen] = React.useState(false);
  const [pythonOpen, setPythonOpen] = React.useState(false);

  const handleClick = (menu, e) => {
    console.log(menu);
    switch (menu) {
      case "react":
        setReactOpen(!reactOpen);
        break;

      case "python":
        setPythonOpen(!pythonOpen);
        break;

      default:
        break;
    }
  };

  const subMenuClick = (subMenu, e) => {
    console.log(subMenu);
    switch (subMenu) {
      case "router":
        //setReactOpen(!reactOpen);
        break;

      default:
        break;
    }
  };

  const menuList = [
    {
      main: "react",
      state: reactOpen,
      sub: ["materialui", "redux", "router", "typescript"],
    },
    {
      main: "python",
      state: pythonOpen,
      sub: ["vitualenv"],
    },
  ];

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((menu, index) => (
          <>
            <ListItemButton onClick={(e) => handleClick(menu.main, e)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={menu.main} />
              {menu.state ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {menu.sub.length > 0 ? (
              <Collapse in={menu.state} timeout="auto" unmountOnExit>
                {menu.sub.map((sub, subIndex) => (
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText
                        primary={sub}
                        onClick={(e) => subMenuClick(sub, e)}
                      />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            ) : (
              false
            )}
          </>
        ))}
      </List>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default LeftSide;
