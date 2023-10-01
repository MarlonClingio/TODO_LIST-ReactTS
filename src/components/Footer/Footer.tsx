import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span>React Typescript TODO List</span> &copy; 2023
      </p>
    </footer>
  )
}

export default Footer