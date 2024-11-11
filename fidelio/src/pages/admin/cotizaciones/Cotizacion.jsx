import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { url } from '../../../config/envairoment'
import getCookie from '../../../../services/cookiesService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCard from '../../../components/userCard/UserCard'


export default function Cotizacion() {
    const location = useLocation();
    const { idUsuario } = location.state || {};
    const [usuario, setUsuario] = useState(null);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const fetchCotizaciones = async () => {
            const token = getCookie('auth');
            console.log(idUsuario)
            try {
                const response = await fetch(`${url}cotizaciones/usuario/${idUsuario}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "Application/JSON",
                        "auth": token
                    },
                    
                    
                });

                if (!response.ok) {
                    toast.error('Error al obtener las cotizaciones');
                }
                const data = await response.json();
                setCotizaciones(data);


            } catch (error) {
                setError(err.message);
            }
        };
        fetchCotizaciones();
    }, [])

    return (
        <div>

            <UserCard userId={idUsuario} />
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
    </div>
    )
}

