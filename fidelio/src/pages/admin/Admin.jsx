import React, {useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Usuarios from './usuarios/Usuarios'
import Prestamos from './pestamos/Prestamos'
import Bancos from './bancos/Bancos'
import Cotizacion from './cotizaciones/Cotizacion'
import Banco from './bancos/Banco'
import {url} from "../../config/envairoment.js"
import getCookie from "../../../services/cookiesService";


export default function Admin() {
  const navigate = useNavigate();


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
      console.log(":D")
    } else if(response.status != 200){
      navigate("/");
    }
  } 
  
  useEffect(()=> {
    checkAdmin()
  }, [])

  let idUsuario = 1;
  return (
    <div>
    <h1>WillKommen</h1>
    <nav>
      <ul>
        <li><Link to="banco">Banco</Link></li>
        <li><Link to="usuarios">Usuarios</Link></li>
        <li><Link to="prestamos">Préstamos</Link></li>
        {/* <li><Link to="cotizaciones">Cotizaciones</Link></li> */}
      </ul>
    </nav>
    <div>
        <Routes>
            <Route path='banco' element={ <Bancos></Bancos> }></Route>
            <Route path='usuarios' element={<Usuarios></Usuarios>}></Route>
            <Route path='prestamos' element={<Prestamos></Prestamos>}></Route>
            <Route path='cotizaciones' element={<Cotizacion ></Cotizacion>}></Route> 
            <Route path='ban' element={<Banco ></Banco>}></Route> 
        </Routes>
    </div>
  </div>
  )
}
