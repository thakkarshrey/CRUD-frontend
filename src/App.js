import './App.css';
import {AppContext} from './AppContext';
import { Suspense, useState, useEffect } from 'react';
import { routes } from './AppConfigs';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserSessionService from './common/UserSessionService';
import Navbar from './components/navbar/Navbar';
import AppRoutingConfig from './assets/config/AppRoutingConfig';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [isAuthenticated,userAuthenticated] = useState(false)
  const [userName,setUserName] = useState('')
  const [userEmail,setUserEmail] = useState('')
  const [authenticatedToken,setAuthenticatedToken] = useState('')

  useEffect(()=>{
    var loggedInUserStatus = UserSessionService.getUserLoggedInStatus()
    if(loggedInUserStatus === true){
      var usrName,usrEmail,token;
      usrName = UserSessionService.getUserName();
      usrEmail = UserSessionService.getUserEmail();
      token = UserSessionService.getToken();

      userAuthenticated(true)
      setUserName(usrName)
      setUserEmail(usrEmail)
      setAuthenticatedToken(token)
    }
    else{
      userAuthenticated(false)
      setUserName('')
      setUserEmail('')
      setAuthenticatedToken('')
    }
  },[])

  useEffect(()=>{

  },[])

  return (
    <>
    <AppContext.Provider value={{
      isAuthenticated,userAuthenticated,
      userName,setUserName,
      userEmail,setUserEmail,
      authenticatedToken,setAuthenticatedToken
    }}>
      {/* <Sidebar> */}
    <Navbar>
    <Suspense fallback>
    <Routes>
    {routes.map((route) => {
          
            return <Route key={route.path} path={route.path} exact element={route.path === AppRoutingConfig.APP_DEFAULT_PATH_URL ? route.component : <route.component/>}/>
          
    })}
    </Routes>
    </Suspense>
    </Navbar>
    {/* </Sidebar> */}
    </AppContext.Provider>
    </>
  );
}

export default App;
