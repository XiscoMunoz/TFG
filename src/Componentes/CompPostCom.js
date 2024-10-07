import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useIdContext } from '../Hooks/IDhooks'
import { useSqlHook } from '../Hooks/SqlHook';
import { ListaComentarios } from './ListaComentarios';
import { CompPost } from './CompPost'

export const CompPostCom = () => {

    const { idValor } = useIdContext();
    const { idPost } = useParams()

    const { resultado, error, llamarApi } = useSqlHook('POST');

    const info = () => {
        
    }

    const contenido = () => {
        if(resultado.length>0){
        return (
            <div class="h-screen overflow-y-auto scrollbar-hidden ">
                <CompPost key={idPost} contenido={resultado[0].contenido} fecha={resultado[0].fecha} idPost={idPost} correo={resultado[0].correo} nombre={resultado[0].nombre} like={resultado[0].liked} tipo={resultado[0].tipo} urlFoto={resultado[0].foto}></CompPost>

                <ListaComentarios opciones={idPost} ></ListaComentarios>
            </div>
        )}

    }

    useEffect(() => {
        llamarApi('http://localhost:1234/home/postUnico', { idPost });
    }, []);

    return (
        contenido()
    );
};