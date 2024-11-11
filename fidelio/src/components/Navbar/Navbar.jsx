import React, {useState, useEffect} from "react";
import "./navbar.css";
import { removeAll } from "../../../services/cookiesService";
import {url} from "../../config/envairoment.js"
import { Link } from "react-router-dom";
import getCookie from "../../../services/cookiesService";

export default function Navbar() {
  const [adminResponse, setAdminResponse] = useState(false);

  const checkAdmin = async () => {

    const token = getCookie('auth');
    const response = await fetch(`${url}login/adminauth`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "Application/JSON",
          "auth": token
        }
      });

    if(response.ok){
      setAdminResponse(true);
      console.log(adminResponse)
    } else if(response.status != 200){
      console.log("a")
    }
  } 
  
  useEffect(()=> {
    checkAdmin()
  }, [])


  const handleCloseSession = () => {
    removeAll();
  }

  return (
    <nav className="navbar">
      <ul>
        <li><Link to={"/"}>EasyQuote</Link></li>
        <li>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-glyphs/100/FFFFFF/cottage.png"
            alt="cottage"
          />
        </li>
      </ul>
      <ul>
        {adminResponse ? (<>
        <li><Link to={"/admin"}>Admin</Link></li>
        
        </>) : (<>
        <Link>Nueva Cotización</Link>
        </>)}
        <li>Perfil</li>
        <li onClick={handleCloseSession}>Cerrar Sesión</li>
      </ul>
    </nav>
  );
}
