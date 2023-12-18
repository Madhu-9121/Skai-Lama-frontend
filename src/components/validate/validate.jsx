import React, { useState,useEffect } from 'react';
import styles from './validate.module.css'
import axios from 'axios';
import Projects from '../projects/projects';
import Header from "../../components/header/header";

const Validate = () => {
//   const [show, setShow] = useState(true);    
  const [newToLama, setNewToLama] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    // Check email is there in local storage ...................uncommnet the below line and above email state to "" used for default email login
    const storedEmail = localStorage.getItem('userEmail');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(storedEmail);
    if (isValid) {
      setEmail(storedEmail);
      // Fetch user data based on stored email
      handleLogin(storedEmail);
    }
  }, []);

  const handleLoginButton = () => {
    console.log(newToLama)
    setActiveButton('login');
    setNewToLama(false);
  };
  const handleRegisterButton = () => {
    console.log(newToLama)
    setNewToLama(true);
    setActiveButton('register');
  };
  const validateEmail = (exm) => {
    //  email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(exm);
    // setIsValidEmail(isValid);
    return isValid
  };
  const handleRegistration = () => {

    console.log("called",'https://skailama-backend-final.onrender.com')
    axios 
      .post(`${'https://skailama-backend-final.onrender.com'}/v1/user`, {
        email: email,
        projects: [],
      })
      .then((response) => {
        setResponseData(response.data);
        console.log('User registered successfully:', response.data);
        // Save email inlocal storage  registration
        localStorage.setItem('userEmail', email);
        setShowProjects(true);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };
  const handleLogin = (loginEmail) => {
    axios
      .get(`${'https://skailama-backend-final.onrender.com'}/v1/${loginEmail}`)
      .then((response) => {
        setResponseData(response.data.projects);
        console.log('User logged in:', response.data.projects);
        localStorage.setItem('userEmail', email);
        setShowProjects(true);
      })
      .catch((error) => {
        console.error('Error in logging :', error);
      });
  };
 


  const handleSubmit = () => {
    const ans = validateEmail(email);
    console.log(email)
    console.log(ans)
    if (ans) {
      // If already registered perform login else register
      newToLama ? handleRegistration() : handleLogin(email);
    }else{
        setIsValidEmail(false)
    }
  };

  return (
  <>
    <Header/>


    {!showProjects ? (<div className={styles.main}>
        <h1 className={styles.welcome}> Welcome to LAMA..!!  <span style={{fontSize:"22px",color:"grey",display:'block',marginTop:'10px'}}>manage your workload by utilizing LAMA</span></h1>
       
      <div className={styles.btnParent}>
        <button className={`${styles.btn} ${activeButton === 'login' ? styles.activeBtn : ''}`} onClick={() => handleLoginButton()}>Already Registered</button>
        <button className={`${styles.btn} ${activeButton === 'register' ? styles.activeBtn : ''}`} onClick={() => handleRegisterButton()}>New to Here</button>
      </div>

      
        <div className={styles.inputAndSubmit}>
  
          <input
            className={styles.inputBar}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
         <button className={styles.sbbtn} onClick={handleSubmit} style={{ marginTop:"20px"}} >Submit</button>

        </div>

      {!isValidEmail && (
        <div className={styles.warning}>
          <p style={{ color: 'red', marginLeft: '70px', marginTop: '5px' }}>Please enter a valid email address.</p>
        </div>
      )}

    
    </div>): <Projects responseData={responseData}/>}
    </>
    
  )
  
};

export default Validate;
