
import './App.css';

import { Route, Routes } from 'react-router-dom'

import { CompInicial } from './Componentes/CompInicial';
import { CompHome } from './Componentes/CompHome';

import { CompInicioSesion } from './Componentes/CompInicioSesion';
import { CompNuevoUsuario } from './Componentes/CompNuevoUsuario';
import { CompMensajes } from './Componentes/CompMensajes';
import { CompPerfil } from './Componentes/CompPerfil';
import { CompSolicitudes } from './Componentes/CompSolicitudes';
import { SuministrarID } from './Contextos/idContexto';
import { ListaPost } from './Componentes/ListaPosts';
import { CompConversacion } from './Componentes/CompConversacion';
import { CompListadoMensajes } from './Componentes/CompListadoMensajes';
import { ListaComentarios } from './Componentes/ListaComentarios';
import { ListaAmigos } from './Componentes/ListaAmigos';
import { CompPostCom } from './Componentes/CompPostCom';
import { SuministrarTiempo } from './Contextos/TiempoContexto';
import { CompOpciones } from './Componentes/CompOpciones';
import { SuministrarPost } from './Contextos/PostContexto';
import { SuministrarPerfil } from './Contextos/Perfilcontexto';


function App() {


  return (
    <>
      <SuministrarID>
        <SuministrarTiempo>
          <SuministrarPost>
            <SuministrarPerfil>

            <Routes>

              <Route path='/' element={<CompInicial></CompInicial>}>
                <Route path='inicioSesion' element={<CompInicioSesion></CompInicioSesion>}></Route>
                <Route path='nuevoUsuario' element={<CompNuevoUsuario></CompNuevoUsuario>}></Route>
              </Route>

              <Route path='/' element={<CompHome></CompHome>}>

                <Route path='home' element={<ListaPost opciones='0' ></ListaPost>}></Route>

                <Route path='post/:idPost' element={<CompPostCom></CompPostCom>}></Route>

                <Route path='mensajes' element={<CompMensajes></CompMensajes>}>
                  <Route path='listado' element={<CompListadoMensajes></CompListadoMensajes>}></Route>
                  <Route path='listado/:name' element={<CompConversacion></CompConversacion>}></Route>
                </Route>

                <Route path='perfil' element={<CompPerfil propio={-1}></CompPerfil>}>
                  <Route key="posts" path='posts' element={<ListaPost opciones='1' ></ListaPost>}></Route>
                  <Route key="comentarios" path='comentarios' element={<ListaComentarios opciones={0}></ListaComentarios>}></Route>
                  <Route key="likes" path='likes' element={<ListaPost opciones='3' ></ListaPost>}></Route>
                  <Route key="amigos" path='amigos' element={<ListaAmigos></ListaAmigos>}></Route>
                  <Route key="opciones" path='opciones' element={<CompOpciones></CompOpciones>}></Route>
                </Route>

                <Route path='perfilAmigo' element={<CompPerfil propio={0}></CompPerfil>}>
                  <Route key="posts" path='posts' element={<ListaPost opciones='1' ></ListaPost>}></Route>
                  <Route key="comentarios" path='comentarios' element={<ListaComentarios opciones={0}></ListaComentarios>}></Route>
                  <Route key="likes" path='likes' element={<ListaPost opciones='3' ></ListaPost>}></Route>
                </Route>

                <Route path='solicitudes' element={<CompSolicitudes></CompSolicitudes>}></Route>

              </Route>

            </Routes>
            </SuministrarPerfil>
          </SuministrarPost>
        </SuministrarTiempo>
      </SuministrarID>
    </>
  );
}

export default App;
