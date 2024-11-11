import React, { useEffect, useState } from 'react';
import { url } from '../../../config/envairoment';
import getCookie from '../../../../services/cookiesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const goToCotizacion = (idUsuario) => {
    console.log(idUsuario)
    navigate(`/admin/cotizaciones`, { state: { idUsuario: idUsuario } });
  };

  const handleDelete = async (idUsuario) => {
    console.log(`Eliminar usuario con ID: ${idUsuario}`);
    const data = { idUsuario: idUsuario };
    const token = getCookie('auth');
    try {
      const response = await fetch(url + 'usuarios/delete', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "Application/JSON",
          "auth": token
        }
      });
      const dataResponse = await response.json();

      if (response.ok) {
        toast.success("Usuario eliminado correctamente");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.idUsuario !== idUsuario)
        );
      } else {
        throw new Error(dataResponse.msg || "No se pudo eliminar el usuario");
      }
    } catch (error) {
      toast.error('No se pudo eliminar el usuario');
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = getCookie('auth');
      try {
        const response = await fetch(url + 'usuarios/getall', {
          method: 'GET',
          headers: {
            "Content-Type": "Application/JSON",
            "auth": token
          }
        });
        if (!response.ok) {
          toast.error('Error al obtener los datos');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario} onClick={() => goToCotizacion(usuario.idUsuario)}> 
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(usuario.idUsuario);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
