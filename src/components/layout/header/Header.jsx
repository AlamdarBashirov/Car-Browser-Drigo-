import styles from './Header.module.scss'
import React from 'react'

const Header = () => {
  return (
    <div className={styles.site_header}>
        <div className={styles.site_header_container}>
            <h1>Rent a Car</h1>
        </div>
    </div>
  )
}

export default Header