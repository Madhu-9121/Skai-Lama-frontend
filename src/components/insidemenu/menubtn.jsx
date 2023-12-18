    import React,{useState} from 'react'
    import styles from './projectmenu.module.css'
    const Menubtn = ({num, name,setSelectedTab}) => {
        const [selected, setSelected] = useState(false);
        const handleClick=()=>{
            setSelectedTab(name)
            setSelected(!selected);
            
            
        }
    return (
        <div onClick={handleClick} className={`${styles.childParent} ${selected ? styles.selected : ''}`}>
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