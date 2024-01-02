import React from "react"
import Image from "next/image"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header__container}>
      <div className={styles.header__logo}>
        <Image
          src="/BookmarkerLogo.svg"
          width="128"
          height="128"
          alt="Logo"
          priority={true}
          className={styles.header__logo_img}
        />
      </div>
    </header>
  )
}

export default Header
