import React, { useEffect, useState } from "react";
import "./home.css";
import { url } from '../../config/envairoment';
import getCookie from '../../../services/cookiesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      const token = getCookie('auth');
      try {
        const response = await fetch(`${url}cotizaciones/usuario/1`, {
          method: 'GET',
          headers: {
            "Content-Type": "Application/JSON",
            "auth": token
          },
        });

        if (!response.ok) {
          toast.error('Error al obtener las cotizaciones');
          return;
        }

        const data = await response.json();
        setCotizaciones(data);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
        toast.error('Error al obtener las cotizaciones');
      }
    };
    fetchCotizaciones();
  }, []);

  return (
    <>
      <ToastContainer />
      <header className="home-header">
        <h1>Bienvenido Usuario</h1>
      </header>

      <section className="home-actions">
        {/* Botones de acción, si los necesitas */}
      </section>

      {cotizaciones.length === 0 ? (
        <p>No hay cotizaciones disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Cotización</th>
              <th>Valor de la Casa</th>
              <th>Banco</th>
              <th>Años</th>
              <th>Tasa Anual (%)</th>
              <th>Enganche</th>
              <th>Mensualidad</th>
              <th>Monto Total a Pagar</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.map((cotizacion) => (
              <tr key={cotizacion.idCotizacion}>
                <td>{cotizacion.idCotizacion}</td>
                <td>${cotizacion.valorCasa.toLocaleString()}</td>
                <td>{cotizacion.idBanco}</td>
                <td>{cotizacion.annos}</td>
                <td>{cotizacion.tasaAnual}%</td>
                <td>${cotizacion.enganche.toLocaleString()}</td>
                <td>${cotizacion.mensualidad.toLocaleString()}</td>
                <td>${cotizacion.montoaPagar.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Home;
