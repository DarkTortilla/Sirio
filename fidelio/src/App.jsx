import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login"
import Admin from "./pages/admin/Admin";

import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import getCookie from "../services/cookiesService";
import "./App.css";

function App() {
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(()=> {
    const interval = setInterval(()=> {
      const cookie = getCookie("auth");
      if(cookie != null){
        setHasCookie(true);
        // navigate("/")
      } else {
        setHasCookie(false);
        // navigate("/")
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [hasCookie])
  


  return (
    <>
    
    {hasCookie ? 
      (
        <>
          <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path="/admin/*" element={<Admin></Admin>}/>
            <Route path="/nueva-co"></Route>
          </Routes>
          </Router>
        </>
      ) : (
          <Login/>
      )
      }
    
      
    </>
  );
}

export default App;
