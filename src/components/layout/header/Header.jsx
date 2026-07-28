import styles from './Header.module.scss'
import React from 'react'
import { NavLink } from "react-router-dom";

const Header = () => {
  return (

    <div className={styles.siteHeader}>
      <div className={styles.siteHeaderContainer}>

        <NavLink to="/" className={styles.logo}>
          Rent a Car
        </NavLink>

        <nav className={styles.navigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            My Bookings
          </NavLink>
        </nav>

      </div>
    </div>
  )
}

export default Header