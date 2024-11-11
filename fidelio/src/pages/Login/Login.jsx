import React, { useState, useRef } from 'react';
import './login.css';
import { url } from '../../config/envairoment.js';
import getCookie from '../../../services/cookiesService.js';
import { setCookie } from '../../../services/cookiesService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [edad, setEdad] = useState(0);
  const [telefono, setTelefono] = useState("");
  const [sueldo, setSueldo] = useState(0.0);
  const [correo, setCorreo] = useState('');
  const [RFC, setRFC] = useState("");
  const [pass, setPass] = useState('');
  const [loginType, setLoginType] = useState("Login")
  // const [registerType, setRegisteType] = useState(false);
  const [loader, setLoader] = useState(false)
  const token = getCookie('token');
  const loaderRef = useRef(null);
  let data = {};

  const handleLogin = () => {
    setLoginType("Admin");
  }

  const handleAdminLogin = () => {
    setLoginType("Login");
  }

  const handleRegister = () => {
    setLoginType("Register");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let urlLogin = ""
    data = { correo, pass };


    if (loginType == "Login") {
      urlLogin = "login/usuario";
      data = { correo, pass };
    } else if (loginType == "Admin") {
      urlLogin = "login/admin";
      data = { correo, pass };
    } else if (loginType == "Register") {
      urlLogin = "usuarios/crear"
      data = { nombre, apellidoP, apellidoM, RFC, edad, telefono, pass, sueldo, correo };
    }


    try {
      // fetch para el login
      const response = await fetch(url + urlLogin, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/JSON",
          //"auth": token
        }
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setCookie('auth', dataResponse.token, 12);
        toast.success("Inicio de sesión exitoso!");
        setLoader(false);
      } else {
        setLoader(false);
        throw new Error(dataResponse.msg || "Error de inicio de sesión");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error en el servidor");
      setLoader(false)
    }
  };

  return (
    <>
      <h1>EasyQuote</h1>
      <>
        <div className="login-section">
          {loginType == "Login" ? (<>
            <h2>Iniciar Sesión</h2>
          </>) : loginType == "Admin" ? (<>
            <h2>Iniciar Sesión (Admin)</h2>
          </>) : (
            <h2>Registro</h2>
          ) }

          <form onSubmit={handleSubmit} className="login-form">
            { loginType == "Register" ? (
             <>
              <div className="register-section">
                <div className="form-div">
                  <label htmlFor="">Nombre</label>
                  <input type="text" onChange={(e)=> setNombre(e.target.value)} />
                </div>
                <div className="form-div">
                  <label htmlFor="">Apellido Paterno</label>
                  <input type="text" onChange={(e)=> setApellidoP(e.target.value)} />
                </div>
                <div className="form-div">
                  <label htmlFor="">Apellido Materno</label>
                  <input type="text" onChange={(e)=> setApellidoM(e.target.value)}/>
                </div>
                <div className="form-div">
                  <label htmlFor="">Correo</label>
                  <input type="email" onChange={(e)=> setCorreo(e.target.value)}/>  
                </div>
                <div className="form-div">
                  <label htmlFor="">Teléfono</label>
                  <input type="number" onChange={(e)=> setTelefono(e.target.value)}/>
                </div>
                <div className="form-div">
                  <label htmlFor="">RFC</label>
                  <input type="text" onChange={(e)=> setRFC(e.target.value)}/>
                </div>
                <div className="form-div">
                  <label htmlFor="">Edad</label>
                  <input type="number" onChange={(e)=> setEdad(e.target.value)}/>
                </div>
                <div className="form-div">
                  <label htmlFor="">Sueldo (Con decimales)</label>
                  <input type="number" onChange={(e)=> setSueldo(e.target.value)}/>
                </div>
                <div className="form-div">
                  <label htmlFor="">Contraseña</label>
                  <input type="password" onChange={(e)=> setPass(e.target.value)}/>
                </div>
              </div>
             </> 
            ): <>
              <label htmlFor="correo">Correo</label>
              <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)} />
            </>}
            

            <input type="submit" value="Ingresar" />
          </form>
          <div className="login-links">
            {loginType == "Login" ? (<>
              <span onClick={handleRegister}>Regisrarse</span>
              <span onClick={handleLogin}>Iniciar Sesión (Admins)</span>
            </>) : loginType == "Admin" ? (<>
              <span onClick={handleRegister}>Regisrarse</span>
              <span onClick={handleAdminLogin}>Iniciar Sesión (Usuario)</span>
            </>) : ( <>
              <span onClick={handleRegister}>Regisrarse</span>
              <span onClick={handleAdminLogin}>Iniciar Sesión (Usuario)</span>
            </>)}

          </div>
          <ToastContainer />
        </div>
        <div className={loader ? "loader" : "loader loader-none"} ref={loaderRef}></div>
      </>
    </>

  );
}

export default Login;
