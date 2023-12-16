import React from 'react'
import icon from '../../assets/directright.svg'
import settings from '../../assets/settings.svg'
import noti from '../../assets/notifications.svg'
import styles from './header.module.css'
const Header = () => {
  return (
    <div className={styles.topParent}>
        <div className={styles.logoparent}>
            <img className={styles.logo} src ={icon} alt="logo" />
            <p className={styles.brand}>LAMA</p>

        </div>
        <div className={styles.rightItems}>
            <img className={styles.settings} src ={settings} alt="logo" />
            <img className={styles.noti} src ={noti} alt="logo" />
        </div>
    </div>
  )
}

export default Header