'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
// Material ui
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemButton, Divider } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, AccountCircle, ExitToApp } from "@mui/icons-material";
// Icons
import HouseIcon from '@mui/icons-material/House';
import WorkIcon from '@mui/icons-material/Work';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GitHubIcon from '@mui/icons-material/GitHub';
// Styles
import styles from "@/styles/sidebar.module.scss";

const menuItems = [
  { text: "Home", href: "/", icon: <HouseIcon sx={{ color: '#8829e3' }} className={styles.icon} /> },
  { text: "Empleados", href: "/employers", icon: <WorkIcon sx={{ color: '#8829e3' }} className={styles.icon} /> },
  { text: "Clientes", href: "/clients", icon: <PermContactCalendarIcon sx={{ color: '#8829e3' }} className={styles.icon} /> },
  { text: "Contact", href: "/contact", icon: <GitHubIcon sx={{ color: '#8829e3' }} className={styles.icon} /> }
];

const profileOptions = [
  { text: "Mi perfil", href: "/profile", icon: <AccountCircle sx={{ color: '#8829e3' }} className={styles.icon} /> },
  { text: "Logout", href: "/logout", icon: <ExitToApp sx={{ color: '#8829e3' }} className={styles.icon} /> }
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <div className={styles.container}>
      <IconButton onClick={toggleDrawer(true)} className={styles.menuButton}>
        <MenuIcon sx={{ color: '#ffffff' }} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className={styles.drawerContent}>
          <IconButton onClick={toggleDrawer(false)} className={styles.closeButton}>
            <CloseIcon sx={{ color: '#8829e3' }} />
          </IconButton>
          <List>
            {menuItems.map(({ text, href, icon }) => (
              <ListItem key={text} component={Link} href={href}>
                <ListItemButton className={styles.slideBar}>
                  {icon}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ color: '#8829e3' }} />
          <List>
            {profileOptions.map(({ text, href, icon }) => (
              <ListItem key={text} component={Link} href={href}>
                <ListItemButton className={styles.slideBar}>
                  {icon}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
