import React, { useState, useEffect } from 'react';
import { useIdContext } from '../Hooks/IDhooks'
import { CompVentana } from './CompVentana';
import { useSqlHook } from '../Hooks/SqlHook';
import { usePerfilContext } from '../Hooks/PerfilHook';
import { conseguirArchivo } from '../FireBase/confing';
import { Link } from 'react-router-dom'

export const CompPost = (props) => {

    const { contenido, fecha, idPost, correo, nombre, like, tipo, urlFoto, idUsu, borrosa } = props;
    const { idValor } = useIdContext();
    const { perfilPersonal, cambiarValorPerfil } = usePerfilContext();


    const [isOpen, setIsOpen] = useState(false);
    const [liked, setLiked] = useState(like ? true : false);
    const borroso = borrosa === 1;

    const openModal = () => {
        setIsOpen(true);
    };

    const { resultado, error, llamarApi } = useSqlHook('POST');
    const [urlImagen, setUrlImagen] = useState(null);
    const [urlFotoPerfil, setUrlFoto] = useState(null);
    const [visible, setVisible] = useState(true);
    const [contenidoAmbos, setAmbos] = useState('');

    const cambiarLike = () => {

        llamarApi('http://localhost:1234/home/darLike', { idPost, idValor });
        setLiked(!liked);

    }

    const borrarPost = () => {
        console.log('Elememnnto borrado')
        setVisible(false)
        llamarApi('http://localhost:1234/eliminarPost', { idPost });
    }

    const bloquearPost = () => {
        console.log('Elememnnto bloqueado')
        setVisible(false)
        llamarApi('http://localhost:1234/bloquearPost', { idValor, idPost });
    }

    const formateoFecha = (input) => {

        const fecha = input.slice(0, 10);
        const hora = input.slice(11, 19);

        return (fecha + ' ' + hora)
    }

    const elementoBorrar = () => {

        if (idUsu === idValor) {
            return (
                <div class="flex cursor-pointer items-center transition hover:text-slate-600" onClick={() => borrarPost()} >
                    <span>Borrar</span>
                </div>
            )

        }
    }
    const elementoBloquear = () => {

        if (idUsu !== idValor) {

            return (
                <div class="flex cursor-pointer items-center transition hover:text-slate-600" onClick={() => bloquearPost()}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mr-1.5 h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </div>
            )

        }
    }

    useEffect(() => {
        conseguirArchivo(urlFoto).then(url => {
            setUrlFoto(url);
        })

        if (tipo === 'imagen') {
            conseguirArchivo(contenido).then(url => {
                setUrlImagen(url);
            })
        }
        if (tipo === 'ambos') {
            const partesContenido = contenido.split('$');
            setAmbos(partesContenido[0]);
            let nombreArchivo = partesContenido[1];

            conseguirArchivo(nombreArchivo).then(url => {
                setUrlImagen(url);
            })
        }
    }, [contenido]);

    return (
        <>{visible &&
            <div>
                <div class='flex items-center justify-center '>
                    <div class="rounded-xl border p-5 shadow-md w-full bg-yellow">
                        <div class="flex w-full items-center justify-between border-b pb-3">

                            <div class="flex items-center space-x-3">
                                <div onClick={() => cambiarValorPerfil(idUsu)}>
                                    <Link to={"/perfilAmigo/posts"}>
                                        <img src={urlFotoPerfil} class="h-12 w-12 rounded-full bg-slate-400" alt=""></img>
                                    </Link>
                                </div>

                                <div class="text-lg font-bold text-slate-700">{nombre}</div>
                                <div class="text-xs text-neutral-500">{correo}</div>
                            </div>

                            <div class="flex items-center space-x-8">
                                <div class="text-xs text-neutral-500">{formateoFecha(fecha)}</div>
                            </div>
                        </div>

                        <Link to={`/post/${idPost}`}>
                            <div class="mt-4 mb-6 " >
                                {tipo === 'imagen' && (
                                    <div class={`flex justify-center items-center ${borroso ? 'blur-md' : ''}`}>
                                        <img src={urlImagen} width='300' height='300' />
                                    </div>
                                )}

                                {tipo === 'texto' && (
                                    <div class="text-sm text-neutral-600">
                                        {contenido}
                                    </div>
                                )}

                                {tipo === 'ambos' && (
                                    <>
                                        <div class="text-sm text-neutral-600 mb-2">
                                            {contenidoAmbos}  {/* El texto, que es la parte izquierda del '$' */}
                                        </div>
                                        <div class={`flex justify-center items-center ${borroso ? 'blur-md' : ''}`}>
                                            <img src={urlImagen} width='300' height='300' />
                                        </div>
                                    </>
                                )}
                            </div>
                        </Link>

                        <div>
                            <div class="flex items-center justify-between text-slate-500" >
                                <div class="flex space-x-4 md:space-x-8">
                                    <div class="flex cursor-pointer items-center transition hover:text-slate-600" onClick={openModal}>
                                        <svg class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </div>
                                    {isOpen && <CompVentana setIsOpen={setIsOpen} opciones='2' idPost={idPost} />}
                                    <div class="flex cursor-pointer items-center transition hover:text-slate-600" onClick={cambiarLike}>
                                        <svg class="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        <span>{liked ? "No me gusta" : "Me gusta"}</span>
                                    </div>
                                    {elementoBloquear()}
                                    {elementoBorrar()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};
