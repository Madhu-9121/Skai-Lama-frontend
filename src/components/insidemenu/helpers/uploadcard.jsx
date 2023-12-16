import React from 'react'
import styles from './card.module.css'

const UploaCard = ({src,name,text,tabOpen,cardname}) => {
  const handleClick = ()=>{
    tabOpen(true)
    cardname(name)

  }
  return (
    <div onClick={handleClick} className={styles.parent}>
      <img src={src} alt="icon" />
      <div>
        <p className={styles.para}>{text}</p>
        <p className={styles.para}>{name}</p>
      </div>

        
    </div>
  )
}

export default UploaCard