import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { url } from '../../../config/envairoment';
import getCookie from '../../../../services/cookiesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCard from '../../../components/userCard/UserCard';

export default function Banco() {
  const location = useLocation();
  const { idBanco } = location.state || {}; 
  const [prestamos, setPrestamos] = useState([]);
  const [prestamosBanco, setPrestamosBanco]= useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null); // Estado para el select

  useEffect(() => {
    obtenerPrestamos();
    obtenerPrestamosBanco();
  }, []);

  const obtenerPrestamos = async () => {
    const token = getCookie('auth');
    setLoading(true);
    try {
      const response = await fetch(`${url}prestamos/getall`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
      });
      if (!response.ok) throw new Error("Error al obtener los préstamos");
      const data = await response.json();
      setPrestamos(data);
    } catch (error) {
      console.error("Error al obtener los préstamos:", error);
      setError('Error al cargar los préstamos');
    } finally {
      setLoading(false);
    }
  };

  const obtenerPrestamosBanco = async () => {
    const token = getCookie('auth');
    setLoading(true);
    try {
      const response = await fetch(`${url}bancos/getByBanco/${idBanco}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
      });
      if (!response.ok) throw new Error("Error al obtener los préstamos");
      const data = await response.json();
      setPrestamosBanco(data);
    } catch (error) {
      console.error("Error al obtener los préstamos:", error);
      setError('Error al cargar los préstamos');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedPrestamo(event.target.value); // Establece el valor seleccionado
  };

  const handleButtonClick = async () => {
    console.log(idBanco)
    if (!selectedPrestamo) {
      toast.error("Por favor selecciona un préstamo antes de agregar.");
      return;
    }
  
    try {
      const token = getCookie('auth');
      const response = await fetch(`${url}bancoprestamo/crear`, {  
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
        body: JSON.stringify({ 
          idBanco: idBanco, 
          idPrestamo: selectedPrestamo 
        })  
      });
      
      if (!response.ok) throw new Error("Error al agregar el préstamo");
  
      toast.success("Préstamo agregado exitosamente");
      obtenerPrestamosBanco();
    } catch (error) {
      console.error("Error al agregar el préstamo:", error);
      toast.error("Error al agregar el préstamo");
    }
  };
  

  return (
    <div>
      <h2>Lista de Préstamos</h2>
      {error && <p>{error}</p>}
      {loading && <p>Cargando préstamos...</p>}

      {/* Formulario para seleccionar y agregar préstamos */}
      <form onSubmit={(e) => e.preventDefault()}>
        <select value={selectedPrestamo} onChange={handleSelectChange}>
          <option value="">Selecciona un préstamo</option>
          {prestamos.length > 0 ? (
            prestamos.map((prestamo) => (
              <option key={prestamo.idPrestamo} value={prestamo.idPrestamo}>
                {`Préstamo ${prestamo.idPrestamo} - ${prestamo.interes}% de interés - $${prestamo.enganche.toLocaleString()}`}
              </option>
            ))
          ) : (
            <option value="">No hay préstamos disponibles</option>
          )}
        </select>

        <button type="button" onClick={handleButtonClick}>
          Agregar préstamo
        </button>
      </form>

      {/* Tabla de préstamos */}
      {prestamosBanco.length === 0 ? (
        <p>No hay préstamos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Préstamo</th>
              <th>Interés (%)</th>
              <th>Años</th>
              <th>Enganche</th>
            </tr>
          </thead>
          <tbody>
            {prestamosBanco.map((prestamo) => (
              <tr key={prestamo.idPrestamo}>
                <td>{prestamo.idPrestamo}</td>
                <td>{prestamo.interes}%</td>
                <td>{prestamo.annos}</td>
                <td>${prestamo.enganche.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
}
