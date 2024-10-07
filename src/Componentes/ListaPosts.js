import React, { useEffect, useState } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { usePostContext } from '../Hooks/PostHook';
import { useSqlHook } from '../Hooks/SqlHook';
import { CompPost } from './CompPost'
import { usePerfilContext } from '../Hooks/PerfilHook';

export const ListaPost = (props) => {

    const { publicacion, cambiarValor } = usePostContext()

    const { idValor } = useIdContext();

    const { opciones } = props;

    const { perfilPersonal, cambiarValorPerfil } = usePerfilContext();

    const condicion = (idValor === perfilPersonal) ||(perfilPersonal===-1);

    const { resultado, error, llamarApi } = useSqlHook('POST');

    const [itemsVisibles, setitemsVisibles] = useState(5);
    const itemasTotales = resultado.slice(0, itemsVisibles);

    const handleShowMore = () => {
        setitemsVisibles((prevItems) => prevItems + 5); // Incrementa el número de elementos mostrados en 5
    };

    useEffect(() => {
        if(condicion){
            console.log('nomral')
            llamarApi('http://localhost:1234/home/listaPost', { idValor, opciones });
        }else{
            console.log('else')
            llamarApi('http://localhost:1234/home/listaPost', { idValor:perfilPersonal, opciones });
        }
        

    }, [opciones]);

    useEffect(() => {
        if (publicacion) {
            llamarApi('http://localhost:1234/home/listaPost', { idValor, opciones });
            cambiarValor(false)
        }
    }, [publicacion])

    return (
        <div class="h-screen overflow-y-auto scrollbar-hidden ">
            {itemasTotales.map(post => (
                <CompPost key={post.id_post} contenido={post.contenido} fecha={post.fecha} idPost={post.id_post} correo={post.correo} nombre={post.nombre} like={post.id_like} tipo={post.tipo} urlFoto={post.foto} idUsu={post.id_usuario} borrosa={post.borrosa}></CompPost>
            ))}

            {itemsVisibles < resultado.length && (
                <div className="text-center mt-4">
                    <button onClick={handleShowMore}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Mostrar más
                    </button>
                </div>
            )}
        </div>


    );
};