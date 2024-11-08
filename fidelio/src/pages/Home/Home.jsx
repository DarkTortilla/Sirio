import React from "react";
import "./home.css";

function Home() {
  return (
    <>
      <header className="home-header">
        <h1>Bienvenido Usuario</h1>
        <div>
          <p>
            Último Préstamo: <b>$0</b> para <b>Pepito Pérez</b>
          </p>
        </div>
      </header>
      <section className="home-actions">
        <div className="action-btns">
          <button className="btn main-btn">Nuevo Cliente</button>
          <button className="btn main-btn">Nuevo Préstamo</button>
          <button className="btn info-btn">Clientes</button>
          <button className="btn info-btn">Historial de Préstamos</button>
        </div>
      </section>
    </>
  );
}

export default Home;