import React ,{useEffect, useState} from 'react'
import styles from './project.module.css'
import smallhome from '../../../assets/smallhome.svg'
import UploaCard from './uploadcard'
import youtube from '../../../assets/youtube.svg'
import spo from '../../../assets/spo.svg'
import rss from '../../../assets/rss.svg'
import cloud from '../../../assets/cloud_upload.svg'
import RenderDataTable from './RenderDataTable'
import ellipse from '../../../assets/Ellipse3.svg'
import EditIterface from './editIterface'

const Project = ({pname,tab,data}) => {
  const [isCreateProjectTabOpen, setCreateProjectTabOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [content, setContent] = useState('');
  const [clickedCard,setClickedCard] = useState("")
  const [tasks, setTasks] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [editclicked,setEditClicked] = useState(false)
  const [editTask,setEditTask] =useState('')
  useEffect(()=>{
    if (Array.isArray(data) && data.length>=1) {
      setTasks(data)
      setUploadSuccess(true)
      console.log("received data task:", data);
    }


  },[ data])

  const handleUploadClick = () => {
    const email = localStorage.getItem('userEmail');
    console.log(email)
    const apiUrl = `${'https://skailama-backend-final.onrender.com'}/v1/user/${email}/newtask`;
    const requestData = {
      "projectName": pname,
      "itemName": itemName,
      "content": content
    };
  console.log(requestData)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    .then((response) => response.json())
    
    .then((data) => {
      console.log("tasks response", data);

      setCreateProjectTabOpen(false);
      setTasks(data.items);
      console.log("tasks added", tasks);

      setUploadSuccess(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

// logic for handling interfaces
  const renderUploadInterface = () => (
    <div className={styles.parent}>
      <div className={styles.createProjectTab}>
        <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
          <p className={styles.tabHead}>Upload From {clickedCard}</p>
          <p className={styles.cross}onClick={()=>{setCreateProjectTabOpen(false)}}>X</p>
        </div>
        <p style={{marginBottom:"0px",color:"black"}}>Name</p>
        <input
          type="text"
          className={styles.inputBar}
          placeholder="Type here..."
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <p style={{marginTop:"15px",marginBottom:"0px",color:"black"}}>Description</p>
        <input
          type="text"
          className={styles.inputBar}
          placeholder="Type here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className={styles.sbbtn} onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  );




  return (
    <>
    {isCreateProjectTabOpen || editclicked ?  (
      isCreateProjectTabOpen ? renderUploadInterface(): <EditIterface setEditClicked={setEditClicked} pname={pname} tab={tab} task={tasks.filter((i)=>i.ItemName===editTask)}/>
    ):(
      <>
      <div className={styles.upNav}>
            <img src={smallhome} alt="" width={42} height={42}/>
            <p className={styles.navletter}>/ {pname}/ <span style={{ color: '#7E22CE' }}>{tab}</span></p>
        </div>
      { uploadSuccess===false && (Array.isArray(data) && data.length === 0)? (
        <div className={styles.parent}>
        
        <h1 className={styles.upload}>Upload</h1>
        <div className={styles.btnParent}>
          <div className={styles.child}>
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen} src={youtube} name={"Youtube Video"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen} src={spo} name={"Spotify Podcast"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen} src={rss} name={"RSS Feed"}text={"Upload From"} />
          </div>
          <div className={styles.child}>
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={youtube} name={"Youtube Video"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={spo} name={"Spotify Podcast"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={rss} name={"RSS Feed"}text={"Upload From"} />
          </div>
        </div>
        <p className={styles.or}>or</p>
        <div className={styles.uploadParent}>
          <img src={cloud} alt="upload" />
          <p className={styles.uploadText}>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
          <p className={styles.uploadText2}>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
          <div className={styles.selectFile}>
            <p>Select File</p>
          </div>
        </div>
      
    </div>) : (
       <>
       <h1 style={{"marginLeft":"428px"}}className={styles.upload}>Sample Project</h1>
       <div className={styles.tableCards}>
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={youtube} name={"Youtube Video"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={spo} name={"Spotify Podcast"}text={"Upload"} />
            <UploaCard cardname={setClickedCard} tabOpen={setCreateProjectTabOpen}  src={ellipse} name={"or Text File"}text={"Upload Media"} />
          </div>
        <RenderDataTable setEditClicked={setEditClicked} setEditTask ={setEditTask}pname={pname} tasks={tasks} setTasks = {setTasks}/>
       </>
      
       
      )}
    </>
    )
    }
  </>
  )
}

export default Project