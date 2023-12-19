import React, { useEffect, useState } from 'react'
import styles from './editinterface.module.css'
import smallhome from '../../../assets/smallhome.svg'
import mode from '../../../assets/mode.svg'
import axios from 'axios'
const EditIterface = ({pname,tab,task,setEditClicked}) => {
    const [data,setData] = useState('')
    const [editclick,setEditClick] = useState(false)
    const [editContent, setEditContent] = useState('');
    // const []
    useEffect(() => {
        setData(task[0].content);
      }, [task]);
      const handleEditClick = () => {
        setEditClick(true);
        setEditContent(data); // editContent with the current data
      };
      const handleSaveClick = async () => {
        const email = localStorage.getItem('userEmail')
        // Send PATCH request to update the content
        try {
            console.log(task[0].ItemName,pname,editContent)
          await axios.patch(
            `https://skailama-backend-final.onrender.com/v1/user/${email}`,
            {
              ItemName: task[0].ItemName,
              pname: pname,
              content: editContent,
            }
          );
          // Update data and disable edit mode
        //   setData(editContent);
          setEditClick(false);
        setEditClicked(false)

        } catch (error) {
          console.error('Error updating content:', error);
        }
      };
    
      const handleCancelClick = () => {
        // Cancel the edit mode
        setEditClick(false);
        setEditClicked(false)
        setData(editContent);
           
      };
  return (
    <div className={styles.parent}>
        <div className={styles.upNav}>
            <img src={smallhome} alt="" width={42} height={42}/>
            <p className={styles.navletter}>/ {pname}/ <span style={{ color: '#7E22CE' }}>Transcript</span></p>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'30px',marginTop:'20px'}}>
            <h1 className={styles.upload}>Edit Transcript</h1>
            <div>
                <button onClick={handleCancelClick} className={styles.cancel}>Cancel</button>
                <button onClick={handleSaveClick} className={styles.save}>Save & Exit</button>

            </div>
           


        </div>
        <div className={styles.editTab}>
            <div className={styles.btnSearch}>
                <div onClick={handleEditClick} className={styles.editButton} style={{display:'flex',alignItems:'center',flexDirection:'row',paddingLeft:"10px"}}>
                    <img src={mode} width={24} alt='edit'/>
                    <p className={styles.editTextbtn}> Edit Mode</p>
                </div>
                

            </div>
            <p className={styles.header}>{task[0].ItemName}</p>
            {editclick ? (
          <textarea
            className={styles.editTextArea}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p className={styles.para}>{data}</p>
        )}

        </div>
    </div>
  )
}

export default EditIterface