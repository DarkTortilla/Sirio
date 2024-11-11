import React, { useState, useEffect } from 'react'
import getCookie from '../../../services/cookiesService';
import { url } from '../../config/envairoment';
import './nuevaCotizacion.css'

function NuevaCotizacion() {
    const [idBanco, setIdBanco] = useState(-1);
    const [bancos, setBancos] = useState([]);
    const [prestamosBanco, setPrestamosBanco] = useState([]);
    const [valorCasa, setValorCasa]= useState(null);
    const [idPrestamo, setIdPrestamo]= useState(null);


    const fetchBancos = async () => {
        try {
            const response = await fetch(`${url}bancos/getall`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error("Error al obtener los bancos");
            const data = await response.json();
            setBancos(data);
        } catch (error) {
            console.error("Error al obtener los bancos:", error);
        }
    };

    const obtenerPrestamosBanco = async () => {
        const token = getCookie('auth');
        try {
            const response = await fetch(`${url}bancos/getByBanco/${idBanco}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "auth": token
                },
            });
            if (!response.ok) {
                setPrestamosBanco([]);
                throw new Error("Error al obtener los préstamos");
                }
            const data = await response.json();
            if (data) {
                setPrestamosBanco(data);
            }
            
            
        } catch (error) {
            console.error("Error al obtener los préstamos:", error);
        }
    };

    useEffect(() => {
        fetchBancos();
    }, []);

    useEffect(() => {
        if (idBanco !== -1) {
            obtenerPrestamosBanco();
        }
    }, [idBanco]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('firus')
        console.log('Valor de Casa:', valorCasa);
        console.log('Banco Seleccionado:', idBanco);
        console.log('Préstamo Seleccionado:', idPrestamo);
        
    }

    return (
        <div className='quote-section'>
            <h1>Nueva Cotización</h1>
            <form className='quote-form' onSubmit={handleSubmit}>
                <div className="form-div">
                    <label>Valor de Casa</label>
                    <input type="number"  value={valorCasa} onChange={(e) => setValorCasa(e.target.value)} />
                </div>
                <div className="form-div">
                    <label>Banco</label>
                    <select onChange={(e) => setIdBanco(e.target.value)}>
                        <option value="-1">Sin Seleccionar</option>
                        {bancos.map((banco) => (
                            <option key={banco.idBanco} value={banco.idBanco}>{banco.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-div">
                    <label>Préstamos Disponibles</label>
                    <select value={idPrestamo} onChange={(e) => setIdPrestamo(e.target.value)}>
                        <option value="-1">Sin Seleccionar</option>
                        {prestamosBanco.map((prestamo) => (
                            <option key={prestamo.idPrestamo} value={prestamo.idPrestamo}>
                                {`Años: ${prestamo.annos}, Interés: ${prestamo.interes}`}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="submit" value={"Cotizar"}/>
            </form>
        </div>
    )
}

export default NuevaCotizacion;
