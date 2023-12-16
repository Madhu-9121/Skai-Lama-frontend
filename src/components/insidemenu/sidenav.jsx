import React from 'react'
import styles from './sidenav.module.css'
import Menubtn from './menubtn'
import simage from '../../assets/Icon.svg'
const Sidenav = ({setSelectedTab}) => {
    
  return (
    <div className={styles.parent}>
        <h4 className={styles.header}>Podcast Upload Flow</h4>
        <Menubtn setSelectedTab= {setSelectedTab} name={"Projects"} num={1}/>
        <Menubtn setSelectedTab= {setSelectedTab} name={"Widget Configurations"} num={2}/>
        <Menubtn name={"Deployment"} num={3}/>
        <Menubtn name={"Pricing"} num={4}/>

        <div className={styles.settingsParent}>
            <img className={styles.simage} src={simage} alt='settings'/>
            <h3 className={styles.settings}>Settings</h3>
        </div>
    </div>
  )
}

export default Sidenav