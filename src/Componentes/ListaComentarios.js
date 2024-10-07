import React, { useState, useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { usePostContext } from '../Hooks/PostHook';
import { CompComentario } from './CompComenraio';
import { useSqlHook } from '../Hooks/SqlHook';
import { usePerfilContext } from '../Hooks/PerfilHook';


export const ListaComentarios = (props) => {

    const { idValor } = useIdContext();

    const {publicacion,cambiarValor}=usePostContext();

    const { opciones } = props;

    const { perfilPersonal, cambiarValorPerfil } = usePerfilContext();

    const condicion = (idValor === perfilPersonal) ||(perfilPersonal===-1);

    const { resultado, error, llamarApi } = useSqlHook( 'POST');

    const [itemsVisibles, setitemsVisibles] = useState(5);
    const itemasTotales = resultado.slice(0, itemsVisibles);

    const handleShowMore = () => {
        setitemsVisibles((prevItems) => prevItems + 5); // Incrementa el número de elementos mostrados en 5
    };

    
    const conseguirComentarios = () => {
        if(opciones===0){

            if(condicion){
                llamarApi('http://localhost:1234/home/listaComentarios',{ idValor });
            }else{
                llamarApi('http://localhost:1234/home/listaComentarios',{ idValor:perfilPersonal});
            }

        }else{
            llamarApi('http://localhost:1234/home/listaComentariosPost',{ opciones });
        }
      
    }


    useEffect(() => {
        conseguirComentarios();
    }, [opciones]);

    useEffect(()=>{
        if(publicacion){
            console.log('esto funciona comentarios')
            conseguirComentarios();
            cambiarValor(false)
        }
    },[publicacion])

    const contenidoComponenete = () => {

        return (
            <div>
                {itemasTotales.map(com => (
                    <CompComentario key={com.id_post} contenido={com.contenido} fecha={com.fecha} correo={com.correo} nombre={com.nombre} urlFoto={com.foto}></CompComentario>
                ))}
                {itemsVisibles < resultado.length && (
                <div className="text-center mt-4">
                    <button onClick={handleShowMore}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Mostrar más
                    </button>
                </div>
            )}
            </div>)
    }

    return (
        contenidoComponenete()
    );
};