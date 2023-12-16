import React, { useEffect } from 'react'
import styles from './projectcard.module.css'
const Projectcard = ({title,number,setEnterToProject, setSelectedProject}) => {
    // const title="Project 1"
    // const number ="5"
    
    const short = title
    .split(' ')
    .map(word => word.slice(0, 1))
    .join('');
    const handleClick = ()=>{
        setEnterToProject(true)
        setSelectedProject(title)
    }
  return (
    <div onClick={handleClick} className={styles.main}>
        <div className={styles.shortParent}>
        <h4 className={styles.short}>{short}</h4>
        </div>
        <div>
        <h4 className={styles.title}>{title}</h4>
        <h4 className={styles.episode}>{number} Episodes </h4>
        <br/>
        <h4 className={styles.text}>last edited a week ago</h4>
        </div>
        

        
    </div>
  )
}

export default Projectcard