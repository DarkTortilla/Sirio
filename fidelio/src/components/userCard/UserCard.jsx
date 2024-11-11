import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Para mostrar mensajes
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../../config/envairoment';
import getCookie from '../../../services/cookiesService';

export default function UserCard({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Cargar la información del usuario
    useEffect(() => {
        const fetchUser = async () => {

            const token= getCookie('auth');
            try {
                const response = await fetch(`${url}usuarios/getbyid/${userId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "Application/JSON",
                        "auth": token
                    }
                }); // Cambia la URL a la de tu API
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del usuario');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error:', error);
                setError('No se pudo cargar la información del usuario');
                toast.error('Error al cargar la información del usuario');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="user-card-image">
               <img src="https://img.freepik.com/foto-gratis/hombre-pulgar-arriba-sobre-fondo-blanco_1368-4211.jpg" className="card-img-top" alt="User" />
            </div>
            <div className="card-body">
                <h5 className="card-title">{user.nombre} {user.apellidoP} {user.apellidoM}</h5>
                <p className="card-text">
                    <strong>RFC:</strong> {user.RFC} <br />
                    <strong>Edad:</strong> {user.edad} <br />
                    <strong>Correo:</strong> {user.correo} <br />
                    <strong>Teléfono:</strong> {user.telefono} <br />
                    <strong>Sueldo:</strong> ${user.sueldo} <br />
                    <strong>Fecha de Alta:</strong> {new Date(user.fechaAlta).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
