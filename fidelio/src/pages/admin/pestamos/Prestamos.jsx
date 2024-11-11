import React, { useEffect, useState } from 'react';
import { url } from '../../../config/envairoment';
import getCookie from '../../../../services/cookiesService';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [nuevoPrestamo, setNuevoPrestamo] = useState({
    interes: '',
    annos: '',
    enganche: ''
  });
  const [mensaje, setMensaje] = useState('');

  // Obtener la lista de préstamos al montar el componente
  useEffect(() => {
    obtenerPrestamos();
  }, []);

  const obtenerPrestamos = async () => {
    const token = getCookie('auth'); // Define el token al inicio de la función
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
      setMensaje('Error al cargar los préstamos');
    }
  };

  // Manejar el cambio en los campos del formulario
  const manejarCambio = (e) => {
    setNuevoPrestamo({
      ...nuevoPrestamo,
      [e.target.name]: e.target.value
    });
  };

  // Enviar nuevo préstamo a la API
  const crearPrestamo = async (e) => {
    e.preventDefault();
    const token = getCookie('auth'); // Asegúrate de obtener el token aquí también
    try {
      const response = await fetch(`${url}prestamos/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
        body: JSON.stringify(nuevoPrestamo)
      });
      if (!response.ok) throw new Error("Error al crear el préstamo");
      toast.done('Préstamo creado exitosamente');
      obtenerPrestamos(); // Actualiza la lista de préstamos después de crear uno nuevo
      setNuevoPrestamo({ interes: '', annos: '', enganche: '' }); // Limpia el formulario
    } catch (error) {
      console.error("Error al crear el préstamo:", error);
      toast.error('Error al crear el préstamo');
    }
  };

  return (
    <div>
            <h2>Crear Nuevo Préstamo</h2>
      <form onSubmit={crearPrestamo}>
        <div>
          <label>Interés (%):</label>
          <input
            type="number"
            name="interes"
            value={nuevoPrestamo.interes}
            onChange={manejarCambio}
            required
          />
        </div>
        <div>
          <label>Años:</label>
          <input
            type="number"
            name="annos"
            value={nuevoPrestamo.annos}
            onChange={manejarCambio}
            required
          />
        </div>
        <div>
          <label>Enganche:</label>
          <input
            type="number"
            name="enganche"
            value={nuevoPrestamo.enganche}
            onChange={manejarCambio}
            required
          />
        </div>
        <button type="submit">Crear Préstamo</button>
      </form>


      <h2>Lista de Préstamos</h2>
      {mensaje && <p>{mensaje}</p>}
      {prestamos.length === 0 ? (
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
            {prestamos.map((prestamo) => (
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


    </div>
  );
}
