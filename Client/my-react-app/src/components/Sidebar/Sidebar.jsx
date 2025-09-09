// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import items from "./items";
import styles from "./sidebar.module.css";

import LogoutIcon from "@mui/icons-material/Logout";
import InfoIcon from "@mui/icons-material/Info";
import MailOutlineIcon from "@mui/icons-material/MailOutline";


export default function Sidebar() {

  const onSubmit = async (ev) =>{
     const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(res)
      if (!res.ok) throw new Error("Login failed");
      window.location.href = "/";
    }

  

  return (
    <aside className={styles.aside} aria-label="Primary">
      <div className={styles.top}>
        <NavLink to="/dashboard" className={styles.brand}>
          Cheapest Cart
        </NavLink>

        <nav className={styles.nav} role="navigation">
          {items.map(({ href, title, icon: Icon }) => (
            <NavLink
              key={title}
              to={href}
              className={({ isActive }) =>
                [styles.item, isActive ? styles.active : ""].join(" ")
              }
            >
              <span className={styles.itemInner}>
                {Icon && <Icon className={styles.icon} />}
                <span>{title}</span>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className={styles.bottom}>
        {/* Info links in their own group */}
        <div className={styles.bottomGroup}>
          <NavLink to="/about" className={styles.bottomItem}>
            <InfoIcon className={styles.bottomIcon} />
            <span>About Us</span>
          </NavLink>
          <NavLink to="/contact" className={styles.bottomItem}>
            <MailOutlineIcon className={styles.bottomIcon} />
            <span>Contact Us</span>
          </NavLink>
        </div>

        {/* Logout (separated below) */}
        <div className={styles.bottomGroup}>
          <NavLink to="/login" onClick={onSubmit} className={styles.bottomItem}>
            <LogoutIcon className={styles.bottomIcon} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
