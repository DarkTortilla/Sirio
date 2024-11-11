import React from 'react'

function Register() {
  return (
    <>
    <h1>EasyQuote</h1>
    <div className="login-section">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-div">
            <label htmlFor="">Nombre</label>
            <input type="text" name="" id="" />
        </div>
        <div className="form-div">
            <label htmlFor="">Apellido</label>
            <input type="text" name="" id="" />
        </div>
        <div></div>
        <div className="form-div">
            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <div className="form-div">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        
        
        <input type="submit" value="Ingresar" />
      </form>
      <div className="login-links">
        <a href="/register">Registrarse</a>
        <a href="/admin">Administrador</a>
      </div>
      <ToastContainer />
    </div>
    <div className={loader ? "loader" : "loader loader-none"} ref={loaderRef}></div>
    </>
  )
}

export default Register