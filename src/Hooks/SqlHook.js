import { useState } from 'react';
export function useSqlHook(method) {

    const [resultado, setResultado] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    const llamarApi = (path,valores) => {
        setCargando(true);
        fetch(path, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la respuesta');
            }
            return response.json();

        }).then(data => {
            setResultado(data)
        }).catch(error => {
            setError(error);
        }).finally(() => {
            setCargando(false);
        });
    }
    
    const llamarApiImagen = (path,valores) => {
        setCargando(true);
        fetch(path, {
            method: method,
            body: valores
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la respuesta');
            }
            return response.json();

        }).then(data => {
            setResultado(data)
        }).catch(error => {
            setError(error);
        }).finally(() => {
            setCargando(false);
        });
    }

    return { resultado,error,cargando,llamarApi,llamarApiImagen }
}