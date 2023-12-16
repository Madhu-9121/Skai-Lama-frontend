import React from 'react'
import styles from './projectmenu.module.css'
const Menubtn = ({num, name,setSelectedTab}) => {
    const handleClick=()=>{
        setSelectedTab(name)
        
    }
  return (
    <div onClick={handleClick} className={styles.childParent}>
        <div>
            <p className={styles.num}>{num}</p>
        </div>
        <div>
            <p className={styles.name}>{name}</p>
        </div>

        
    </div>
  )
}

export default Menubtn