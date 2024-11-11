import React, { useState, useEffect } from 'react';
import { url } from '../../../config/envairoment';
import getCookie from '../../../../services/cookiesService';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Bancos() {
  const [bancos, setBancos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Aquí importamos y usamos el hook

  // Cargar todos los bancos
  useEffect(() => {
    fetchBancos();
  }, []);

  const fetchBancos = async () => {
    const token = getCookie('auth');
    try {
      const response = await fetch(`${url}bancos/getall`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
      });
      if (!response.ok) throw new Error("Error al obtener los bancos");
      const data = await response.json();
      setBancos(data);
    } catch (error) {
      console.error("Error al obtener los bancos:", error);
      setError("Error al obtener los bancos");
    }
  };

  const handleCreateBanco = async (e) => {
    e.preventDefault();
    const token = getCookie('auth');
    try {
      const response = await fetch(`${url}bancos/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth": token
        },
        body: JSON.stringify({ nombre, telefono })
      });
      if (!response.ok) throw new Error("Error al crear el banco");
      toast.success('Banco creado exitosamente');
      fetchBancos(); // Actualizar la lista de bancos
      setNombre('');
      setTelefono('');
    } catch (error) {
      console.error("Error al crear el banco:", error);
      toast.error('Error al crear el banco');
    }
  };

  const handleDelete = async (idBanco) => {
    const token = getCookie('auth');
    try {
      const response = await fetch(`${url}bancos/delete/${idBanco}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth": token
        },
      });
      if (response.ok) {
        toast.success("Banco eliminado correctamente");
        setBancos((prevBancos) =>
          prevBancos.filter((banco) => banco.idBanco !== idBanco)
        );
      } else {
        const dataResponse = await response.json();
        throw new Error(dataResponse.msg || "No se pudo eliminar el banco");
      }
    } catch (error) {
      toast.error('No se pudo eliminar el banco');
    }
  };

  const goToBanco = (idBanco) => {
    navigate(`/admin/ban`, { state: { idBanco } });
  };

  return (
    <div>
      <h2>Bancos</h2>
      <form onSubmit={handleCreateBanco} className="formulario">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          maxLength="15"
        />

        <button type="submit">Crear Banco</button>
      </form>

      {error && <p className="mensaje">{error}</p>}

      <h3>Lista de Bancos</h3>
      {bancos.length === 0 ? (
        <h2>No hay bancos para mostrar</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Banco</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bancos.map((banco) => (
              <tr key={banco.idBanco} onClick={() => goToBanco(banco.idBanco)}>
                <td>{banco.idBanco}</td>
                <td>{banco.nombre}</td>
                <td>{banco.telefono}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(banco.idBanco);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
