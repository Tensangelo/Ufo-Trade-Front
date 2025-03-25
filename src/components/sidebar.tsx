"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
// Material UI
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
  ExitToApp,
} from "@mui/icons-material";
// Icons
import HouseIcon from "@mui/icons-material/House";
import WorkIcon from "@mui/icons-material/Work";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import GitHubIcon from "@mui/icons-material/GitHub";
// Styles
import styles from "@/styles/sidebar.module.scss";

const menuItems = [
  { text: "Home", href: "/", icon: <HouseIcon /> },
  { text: "Empleados", href: "/employers", icon: <WorkIcon /> },
  { text: "Clientes", href: "/clients", icon: <PermContactCalendarIcon /> },
  { text: "Contact", href: "/contact", icon: <GitHubIcon /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { Logout , user } = useAuthContext();

  const toggleDrawer = useCallback((state: boolean) => () => setOpen(state), []);

  if (pathname === "/login" || pathname === "/register") return null;

  const handleLogout = async () => {
    await Logout();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <IconButton onClick={toggleDrawer(true)} className={styles.menuButton} aria-label="Open menu">
        <MenuIcon sx={{ color: "#ffffff" }} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className={styles.drawerContent}>
          <IconButton onClick={toggleDrawer(false)} className={styles.closeButton} aria-label="Close menu">
            <CloseIcon sx={{ color: "#8829e3" }} />
          </IconButton>
          <List>
            {menuItems.map(({ text, href, icon }) => (
              <ListItem key={text} component={Link} href={href}>
                <ListItemButton className={styles.slideBar} selected={pathname === href}>
                  {icon}
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem component={Link} href="/profile">
              <ListItemButton className={styles.slideBar} selected={pathname === "/profile"}>
                <AccountCircle />
                <ListItemText primary="Mi perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton className={styles.slideBar} onClick={handleLogout}>
                <ExitToApp />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
