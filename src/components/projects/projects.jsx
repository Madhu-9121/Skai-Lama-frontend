import React, { useState, useEffect } from "react";
import styles from "./projects.module.css";
import group from "../../assets/Group16.svg";
import home from "../../assets/home.svg";
import add from "../../assets/Vector.svg";
import Projectcard from "./projectcard";
import Projectmenu from '../insidemenu/projectmenu'

const Projects = ({ responseData }) => {
  const [projectList, setProjectList] = useState([]);
  const [showCreateProjectTab, setShowCreateProjectTab] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [enterToProject, setEnterToProject] = useState(false)
  const [selectedProject,setSelectedProject] = useState("")


  useEffect(() => {
    if (Array.isArray(responseData)) {
      setProjectList(responseData);
      console.log("response data projects:", responseData);
    }
  }, [responseData]);

  const handleProjectClick = (projectName) => {
    //  project button
    console.log("Clicked on project:", projectName);
  };

  const handleCreateProjectClick = () => {
    setShowCreateProjectTab(true);
  };

  const handleCancelCreateProject = () => {
    setShowCreateProjectTab(false);
    setNewProjectName("");
  };

  const handleCreateProject = () => {
    // Post -- project data
    const newProject = {
      name: newProjectName,
      items: [],
    };
    // Perform POST request
    // For example:
    const email = localStorage.getItem("userEmail");
    // console.log(email)
    fetch(`${'https://skailama-backend-final.onrender.com'}/v1/user/${email}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log("Project created successfully:", data);
        // Update the project list and reset the state
        setProjectList((prevProjectList) => [...prevProjectList, newProject]);
        handleCancelCreateProject();
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  return (
    <div>
        {!enterToProject ? (
        <div>
        <div className={styles.homeParent}>
            <img src={home} alt="home" />
            <p style={{ color: "black", marginLeft: "2px" }}>Back to Home</p>
        </div>
        {showCreateProjectTab ? (
            <div className={styles.createProjectTab}>
            <p className={styles.tabHead}>Create New Project</p>
            <p
                style={{
                color: "black",
                fontFamily: "sans-serif",
                opacity: "0.7",
                marginTop: "10px",
                }}
            >
                Enter Project Name:
            </p>
            <input
                type="text"
                className={styles.inputBar}
                placeholder="Type here ..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
            />
            <div className={styles.btnparentTab}>
                <button
                className={styles.btnTab}
                style={{
                    color: "red",
                    background: "rgb(227, 227, 225)",
                    border: "10px solid rgb(227, 227, 225)",
                }}
                onClick={handleCancelCreateProject}
                >
                Cancel
                </button>
                <button className={styles.btnTab} onClick={handleCreateProject}>
                Create
                </button>
            </div>
            </div>
        ) : (
            <div>
            {projectList && projectList.length > 0 ? (
                <>
                <div className={styles.cardTopParent}>
                    <h1 className={styles.cardTitle}>Projects</h1>
                    <div className={styles.cardAddButton}>
                    <img src={add} alt="addition" />
                    <button
                        className={styles.insideCardBtn}
                        onClick={handleCreateProjectClick}
                    >
                        Create a New Project
                    </button>
                    </div>
                </div>
                <div className={styles.projectContainer}>
                    {projectList.map((project, index) => (
                    <Projectcard
                        title={project.name}
                        number={project.length}
                        key={index}
                        setEnterToProject = {setEnterToProject}
                        setSelectedProject = {setSelectedProject}
                    />
                    ))}
                </div>
                </>
            ) : (
                <>
                <p className={styles.header}>Create a New Project</p>

                <div className={styles.groupimg}>
                    <img src={group} alt="home" />
                </div>
                <div className={styles.parahead}>
                    <p className={styles.para}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in
                    </p>
                </div>
                <div className={styles.projectBtnHead}>
                    <img src={add} alt="addition" />
                    <button
                    className={styles.projectBtn}
                    onClick={handleCreateProjectClick}
                    >
                    Create a New Project
                    </button>
                </div>
                </>
            )}
            </div>
        )}
        
        </div>):
        (<Projectmenu data= {responseData} selectedProject = {selectedProject}/>)
        }
    </div>
  );
};

export default Projects;
