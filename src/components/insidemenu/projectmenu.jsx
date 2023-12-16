import React, { useEffect, useState } from 'react'
import Sidenav from './sidenav'
import Project from './helpers/project'
import Configurations from './helpers/configurations'
const Projectmenu = ({selectedProject,data}) => {
    const [selectedTab,setSelectedTab] = useState("")
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
      if (selectedProject && data && data.length > 0) {

        const selectedProjectData = data.find(i => i.name === selectedProject);

        if (selectedProjectData && selectedProjectData.items) {
            setTasks(selectedProjectData.items);
        console.log("data  menu:",selectedProjectData.items)

        }
    }
        // console.log(selectedTab)
    },[selectedTab,selectedProject,data])
  return (
    <div style={{color:"blue"}}>
       
        <Sidenav setSelectedTab={setSelectedTab}/>
        {selectedTab && selectedTab === "Projects" && <Project data={tasks} tab={"Upload"} pname={selectedProject}/>}
        {selectedTab && selectedTab === "Widget Configurations" && <Configurations tab={selectedTab} />}
    </div>
  )
}

export default Projectmenu