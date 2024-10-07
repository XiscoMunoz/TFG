import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom'
import { conseguirArchivo } from '../FireBase/confing';

export const CompmenIntermdio = (props) => {

    const { foto_participante,nombre_participante,id_chat} = props;

    const [urlFotoPerfil, setUrlFoto] = useState(null);

    useEffect(() => {
        conseguirArchivo(foto_participante).then(url => {
            setUrlFoto(url);
        })
    }, []);

    return (
        <div>
            <div class='flex items-center justify-center '>
                <div class="rounded-xl border p-5 shadow-md w-full bg-yellow">
                    <div class="flex w-full items-center justify-between">
                        <Link to={`${id_chat}`}>
                            <div class="flex items-center space-x-3">
                                <img src={urlFotoPerfil} class="h-12 w-12 rounded-full bg-slate-400 "></img>
                                <div class="text-lg font-bold text-slate-700">{nombre_participante}</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>



    );
};