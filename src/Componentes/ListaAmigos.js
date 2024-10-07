import React, { useEffect,useState } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';
import { CompSolAmigo } from './CompSolAmigo'


export const ListaAmigos = () => {

    const { idValor } = useIdContext();

    const { resultado, error, llamarApi } = useSqlHook('POST');

    const [nombre, setNombre] = useState('');

    const [itemsVisibles, setitemsVisibles] = useState(5);
    const itemasTotales = resultado.slice(0, itemsVisibles);

    const handleShowMore = () => {
        setitemsVisibles((prevItems) => prevItems + 5); // Incrementa el número de elementos mostrados en 5
    };


    const filtro = () => {
        if(nombre===''){
            conseguirAmigos()
        }else{
            llamarApi('http://localhost:1234/filtroAmigos', { idValor,nombre })
        }
        setNombre('')
    }

    const conseguirAmigos = () => {
        llamarApi('http://localhost:1234/listaAmigos', { idValor })
    }

    useEffect(() => {
        conseguirAmigos();
    }, []);

    const contenidoComponenete = () => {

        return (
            <div >
                <div class="mb-4" >
                    <input type="text" placeholder="Busque un amigo" value={nombre} onChange={e => setNombre(e.target.value)} class="flex-1 py-2 px-3 rounded-full bg-gray-100  rounded px-3 text-sm w-[865px]"></input>
                    <button onClick={() => filtro()} class=" bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600 ">Enviar</button>
                </div>
                {
                    itemasTotales.map(elem => (
                        <CompSolAmigo nombre={elem.nombre} id={elem.id_solicitud} urlFoto={elem.foto} correo={elem.correo}></CompSolAmigo>
                    ))
                }
                {itemsVisibles < resultado.length && (
                <div className="text-center mt-4">
                    <button onClick={handleShowMore}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Mostrar más
                    </button>
                </div>
            )}
            </div >)
    }

    return (
        contenidoComponenete()
    );
};