const dataBase = require('./baseDatos');
const express = require('express')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express()
const puertoServer = process.env.PORT ?? 1234


//DANDO PERMISOS DEL CORS PARA QUE SE PUEDA ACCEDER A LA API
app.use((req, res, next) => { //esto esta aqui porque es algo con el CORS para que puedan solictar otras fuentes
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite solicitudes solo desde este origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir los métodos que desees
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir los encabezados que desees
    next();
});

app.use(express.json());



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correotfgfrancisco@gmail.com',
        pass: 'zdgy zfzo ytvh djwn'
    }
});

function encriptarContraseña(contraseña) {
    const saltRounds = 10;
    const encriptada = bcrypt.hash(contraseña, saltRounds);
    return encriptada;
}

//CREACION DEL SOCKET
const http = require('http');
const server = http.createServer(app)
const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

//SOCKET, PARA ENVIAR MENSAJES 
socketIO.on('connection', (socket) => {

    socket.on('join chat', (data) => {
        console.log('Usuario unido al chat:', data.name);
        socket.join(data.name);
    });

    socket.on('mensaje chat', (data) => {

        dataBase.ejecutarConsulta("SELECT CASE WHEN id_usuario_1 = " + data.idValor + " THEN id_usuario_2 ELSE id_usuario_1 END AS id_usuario FROM chat WHERE id_Chat = " + data.name + ";")
            .then(resultado => {
                const idUsuarioRecibe = resultado[0].id_usuario;
                dataBase.ejecutarConsulta("INSERT INTO mensajes (contenido, id_usuario_envia, id_usuario_recibe, id_Chat,tipo) VALUES ('" + data.mensaje + "','" + data.idValor + "','" + idUsuarioRecibe + "','" + data.name + "','" + data.tipo + "');");
                socket.to(data.name).emit('mensaje chat', 'mensaje recibido');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

})

//INICO DE SESION
app.post('/login/inicioSesion', (req, res) => {

    dataBase.ejecutarConsulta("SELECT contraseña From usuarios WHERE correo='" + req.body.correo + "';").then(resultado => {
        console.log(resultado)
        if(resultado.length>0){
            bcrypt.compare(req.body.contraseña, resultado[0].contraseña).then(comprobacion => {

                console.log(comprobacion)
                if(comprobacion){
                    console.log(' es ciertas')
                    dataBase.ejecutarConsulta("SELECT id_usuario,tiempo,horaInicial,horaFinal From usuarios WHERE correo= '" + req.body.correo + "';").then(resultado => {
                        console.log(resultado)
                        res.send(resultado)
                    }).catch(error => {
                        console.error('Error:', error);
                        res.send('Error:', error)
                    });
                }else{
                    console.log('es falsa')
                    res.send({estado:true})
                }
                
            })
        }else{res.send({estado:true})}
        //console.log(req.body.contraseña)
        //console.log(resultado[0].contraseña)
        //encriptarContraseña(req.body.contraseña).then(xd => console.log(xd))
        

    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });


})

app.post('/encriptar', async (req, res) => {
    const plaintextPassword = 'mi_contraseña';
    const saltRounds = 10;
    const encriptada = await bcrypt.hash(plaintextPassword, saltRounds);
    const encriptada2 = await bcrypt.hash(plaintextPassword, saltRounds);
    console.log('Contraseña encriptada: ' + encriptada);
    console.log('Contraseña encriptada: ' + encriptada2);
    const passwordMatch = await bcrypt.compare(plaintextPassword, encriptada2);
    if (passwordMatch) {
        console.log('Autenticación exitosa. El usuario puede acceder a su cuenta.');
    } else {
        console.log('La contraseña proporcionada es incorrecta.');
    }
});

//CAMBIO DE CONTRASEÑA
app.post('/cambioPassword', (req, res) => {

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 12; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        password += caracterAleatorio;
    }
    const mailOptions = {
        from: 'correotfgfrancisco@gmail.com',
        to: req.body.correo,
        subject: 'cambio contraseña',
        text: 'La contraseña nueva es : ' + password
    };
    console.log(password)
    console.log('el correo es ' + req.body.correo)


    dataBase.ejecutarConsulta("SELECT id_usuario FROM usuarios WHERE correo='" + req.body.correo + "';").then(resultado => {
        console.log(resultado)
        if (resultado.length > 0) {
            try {
                transporter.sendMail(mailOptions);
                console.log('estamos aqui')
                console.log(resultado[0].id_usuario)

                encriptarContraseña(password)
                    .then(encriptada => {
                        console.log(encriptada)
                        dataBase.ejecutarConsulta("UPDATE usuarios SET contraseña='" + encriptada + "' where id_usuario=" + resultado[0].id_usuario + "").then(resultado => {
                        }).catch(error => {
                            res.send('Error:', error)
                        });
                    })

                res.send({ estado: true });

            } catch (error) {
                res.send({ estado: false });
            }

        } else {
            res.send({ estado: false });
        }
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
}
)

app.post('/cambioCredenciales', (req, res) => {



    if (req.body.campos.nombre.length > 0) {
        dataBase.ejecutarConsulta("UPDATE usuarios SET nombre='" + req.body.campos.nombre + "' where id_usuario=" + req.body.idValor + "").then(resultado => {
        }).catch(error => {
            res.send('Error:', error)
        });
    }
    if (req.body.campos.contraseña.length > 0) {

        encriptarContraseña(req.body.campos.contraseña)
            .then(encriptada => {
                console.log(encriptada)
                dataBase.ejecutarConsulta("UPDATE usuarios SET contraseña='" + encriptada + "' where id_usuario=" + req.body.idValor + "").then(resultado => {
                }).catch(error => {
                    res.send('Error:', error)
                });
            })
    }
    if (req.body.campos.correo.length > 0) {

        dataBase.ejecutarConsulta("SELECT id_usuario FROM usuarios WHERE correo='" + req.body.campos.correo + "';").then(resultado => {

            if (resultado.length > 0) {

                res.send({ estado: false })
            } else {
                dataBase.ejecutarConsulta("UPDATE usuarios SET correo='" + req.body.campos.correo + "' where id_usuario=" + req.body.idValor + "").then(resultado => {
                }).catch(error => {
                    res.send('Error:', error)
                });
            }

        }).catch(error => {
            console.error('Error:', error);
            res.send('Error:', error)
        });


    }

})

//CREACION DEUN NUEVO USUARIO
app.post('/login/nuevoUsuario', (req, res) => {

    encriptarContraseña(req.body.contraseña)
        .then(encriptada => {

            dataBase.ejecutarConsulta("SELECT id_usuario FROM usuarios WHERE correo='" + req.body.correo + "';").then(resultado => {

                if (resultado.length > 0) {
                    res.send({ estado: false })
                } else {

                    console.log(req.body.correo)

                    dataBase.ejecutarConsulta("INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('" + req.body.nombre + "','" + req.body.correo + "','" + encriptada + "') ;").then(resultado1 => {
                        dataBase.ejecutarConsulta("SELECT id_usuario From usuarios WHERE correo= '" + req.body.correo + "';").then(resultado => {
                            dataBase.ejecutarConsulta("INSERT INTO opciones (borrosa, horario, contraseña, usuario_id)VALUES (0,0,'',"+resultado[0].id_usuario+")").then(resultado2 => {
                                res.send(resultado)
                            }).catch(error => {
                                console.error('Error:', error);
                                res.send('Error:', error)
                            });
                        }).catch(error => {
                            console.error('Error:', error);
                            res.send('Error:', error)
                        });

                    }).catch(error => {
                        res.send('Error:', error)
                    });
                }

            }).catch(error => {
                console.error('Error:', error);
                res.send('Error:', error)
            });
        })
})

//CREACION DE UN NUEVO POST
app.post('/home/post', (req, res) => {

    dataBase.ejecutarConsulta("INSERT INTO posts (contenido, id_usuario,tipo) VALUES ('" + req.body.contenido + "','" + req.body.id + "','" + req.body.tipo + "') ;").then(resultado => {
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//CREACIONDE UN NUEVO COMENTARIO
app.post('/comentario', (req, res) => {

    dataBase.ejecutarConsulta("INSERT INTO comentarios (contenido, id_usuario,id_post) VALUES ('" + req.body.contenido + "','" + req.body.id + "','" + req.body.idPost + "') ;").then(resultado => {
        //  console.log('Insert  nuevo post bien hecho');
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//DEPENDIENDO DE LA OPCION LISTA LO SIGUIENTE, LOS POSTS (TUYOS Y DE TUS AMIGOS), LOS POSTS PROPIOS Y LOS POSTS A LOS QUE HAS DADO LIKE
app.post('/home/listaPost', (req, res) => {

    let sentencia = '';

    switch (req.body.opciones) {
        case '0': sentencia = "SELECT borrosa,posts.tipo, resu, posts.id_post,contenido,fecha, usuarios.id_usuario,nombre,correo,id_like,foto FROM (SELECT DISTINCT id_usuario_envia AS resu FROM solicitudes WHERE id_usuario_recibe = '" + req.body.idValor + "' AND estado = 'aceptada' UNION SELECT DISTINCT id_usuario_recibe AS resu FROM solicitudes WHERE id_usuario_envia = '" + req.body.idValor + "' AND estado = 'aceptada' UNION SELECT DISTINCT '" + req.body.idValor + "' AS resu ) AS resultado Join opciones on opciones.usuario_id = '" + req.body.idValor + "' JOIN posts ON posts.id_usuario = resultado.resu LEFT JOIN bloqueos ON bloqueos.id_post = posts.id_post AND bloqueos.id_usuario = '" + req.body.idValor + "' JOIN usuarios on usuarios.id_usuario=resultado.resu LEFT JOIN likes ON posts.id_post = likes.id_post AND likes.id_usuario = '" + req.body.idValor + "' WHERE bloqueos.id is null order by fecha DESC;"
            break;
        case '1': sentencia = "SELECT borrosa,posts.tipo, posts.id_post, contenido, fecha,posts.id_usuario, correo, nombre, id_like,foto FROM posts Join opciones on opciones.usuario_id = '" + req.body.idValor + "' JOIN usuarios on posts.id_usuario = '" + req.body.idValor + "' and posts.id_usuario=usuarios.id_usuario LEFT JOIN likes ON posts.id_post = likes.id_post AND likes.id_usuario = '" + req.body.idValor + "' order by fecha DESC;"
            break;
        case '3': sentencia = "Select borrosa,posts.tipo, posts.contenido, posts.fecha, posts.id_post, posts.id_usuario,correo, nombre,id_like,foto From likes Join opciones on opciones.usuario_id = '" + req.body.idValor + "' Join posts on posts.id_post= likes.id_post LEFT JOIN bloqueos ON bloqueos.id_post = posts.id_post AND bloqueos.id_usuario = '" + req.body.idValor + "' JOIN usuarios on posts.id_usuario=usuarios.id_usuario WHERE likes.id_usuario= '" + req.body.idValor + "' and bloqueos.id is null order by fecha DESC"
            break;
    }

   // console.log(sentencia)
    dataBase.ejecutarConsulta(sentencia).then(resultado => {
        //console.log(resultado)
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LISTA LOS COMENTARIOS QUE HA HECHO UN USAURIO
app.post('/home/listaComentarios', (req, res) => {

    dataBase.ejecutarConsulta("Select correo, nombre, fecha,contenido,foto from comentarios  JOIN usuarios On comentarios.id_usuario='" + req.body.idValor + "' and usuarios.id_usuario=comentarios.id_usuario order by fecha DESC").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//GUARDA EL VALOR DEL TIMEPO QUE AL USUARIO AUN LE QUEDA
app.post('/actualizaTiempo', (req, res) => {
    console.log(req.body.tiempo)
    dataBase.ejecutarConsulta("UPDATE usuarios SET tiempo = " + req.body.tiempo + " WHERE id_usuario = '" + req.body.idValor + "';").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//SELECCIONA LA INFORMACION DE UN POST CUANDO QUIERES MOSTRAR UNICACMENTE ESES POST
app.post('/home/postUnico', (req, res) => {

    dataBase.ejecutarConsulta("SELECT usuarios.correo, usuarios.nombre,tipo,posts.fecha, posts.contenido,  usuarios.foto, usuarios.id_usuario,CASE WHEN EXISTS (SELECT id_like FROM likes WHERE likes.id_usuario = usuarios.id_usuario AND likes.id_post = posts.id_post)THEN 1 ELSE NULL END AS liked FROM posts JOIN usuarios ON usuarios.id_usuario = posts.id_usuario WHERE posts.id_post = '" + req.body.idPost + "';").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LISTA LOS COMENTARIO QUE TIENE UN POST EN CONCRETO
app.post('/home/listaComentariosPost', (req, res) => {

    dataBase.ejecutarConsulta("Select correo, nombre, fecha,contenido,foto from comentarios  JOIN usuarios On comentarios.id_usuario=usuarios.id_usuario WHERE comentarios.id_post='" + req.body.opciones + "';").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LISTA TODAS LAS SOLICUTES DE AMISTAD PENDIENTES DE UN USUSARIO
app.post('/solicitudes/recibir', (req, res) => {

    dataBase.ejecutarConsulta("SELECT usuarios_envia.correo, solicitudes.id_usuario_envia, solicitudes.id_solicitud, usuarios_envia.nombre, usuarios_envia.foto FROM solicitudes JOIN usuarios AS usuarios_envia ON usuarios_envia.id_usuario = solicitudes.id_usuario_envia WHERE solicitudes.id_usuario_recibe = " + req.body.idValor + " AND solicitudes.estado = 'pendiente';").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//RECOGE LA INFORMACION DE LAS OPCIONES DE UN USUARIO
app.post('/opcinoesUsu', (req, res) => {

    dataBase.ejecutarConsulta("select borrosa,horario FROM opciones WHERE usuario_id=" + req.body.idValor + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ACTUALIZA LAS OPCIONES DE UN USUARIO
app.post('/actuOpciones/borrosa', (req, res) => {

    dataBase.ejecutarConsulta("UPDATE opciones SET borrosa = " + req.body.valor + " WHERE usuario_id = " + req.body.idValor + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//DADO UN COREERO CREA LA SOLICITUD DE AMISTAD HACIA ESA PERSONA
app.post('/solicitudes/crear', (req, res) => {

    dataBase.ejecutarConsulta("SELECT usuarios.id_usuario from  usuarios where usuarios.correo='" + req.body.contenido + "';").then(resultado => {
        dataBase.ejecutarConsulta("insert into solicitudes (estado,id_usuario_envia,id_usuario_recibe) VALUES('pendiente'," + req.body.idValor + "," + resultado[0].id_usuario + ");").then(resultado => {
            res.send(resultado)
        }).catch(error => {
            console.error('Error:', error);
            res.send('Error:', error)
        });
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//INSERTA O QUITA UN LIKE DE UN POST
app.post('/home/darLike', (req, res) => {

    dataBase.ejecutarConsulta("SELECT * FROM LIKES WHERE id_post=" + req.body.idPost + " AND id_usuario=" + req.body.idValor + "").then(resultado => {
        if (resultado.length !== 0) {
            dataBase.ejecutarConsulta("DELETE from likes WHERE id_usuario= " + req.body.idValor + " and id_post= " + req.body.idPost + ";").then(resultado => {
                res.send(resultado)
            }).catch(error => {
                console.error('Error:', error);
                res.send('Error:', error)
            });
        }
        else {
            dataBase.ejecutarConsulta("insert into Likes (id_usuario,id_post) Values (" + req.body.idValor + "," + req.body.idPost + ");").then(resultado => {
                res.send(resultado)
            }).catch(error => {
                console.error('Error:', error);
                res.send('Error:', error)
            });
        }
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LISTA TODOS LOS CHATS QUE TIENE UNA PERSONA
app.post('/conversaciones', (req, res) => {

    dataBase.ejecutarConsulta("SELECT id_chat ,  CASE WHEN id_usuario_1 = " + req.body.idValor + " THEN id_usuario_2 ELSE id_usuario_1 END AS id_participante, (SELECT nombre FROM usuarios WHERE id_usuario = id_participante) AS nombre_participante,(SELECT foto FROM usuarios WHERE id_usuario = id_participante) AS foto_participante  FROM chat  WHERE (id_usuario_1 = " + req.body.idValor + " or id_usuario_2 = " + req.body.idValor + ");").then(resultado => {
        // console.log(resultado)
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//SELECCIONA TODOS LOS MENSAJES DE UN CHAT ENTRE 2 PERSONAS
app.post('/conversacion', (req, res) => {

    dataBase.ejecutarConsulta("Select * from mensajes where id_Chat= " + req.body.name + " order  By fecha asc").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LISTA LOS AMIGO SDE UN USUARIO
app.post('/listaAmigos', (req, res) => {

    dataBase.ejecutarConsulta("SELECT nombre, id_usuario, id_solicitud,foto,correo FROM (SELECT CASE WHEN id_usuario_envia = " + req.body.idValor + " THEN id_usuario_recibe ELSE id_usuario_envia END AS id_otro_usuario, id_solicitud FROM solicitudes WHERE (id_usuario_envia = " + req.body.idValor + " OR id_usuario_recibe = " + req.body.idValor + ") AND estado = 'aceptada') AS otro_usuario JOIN usuarios ON usuarios.id_usuario = otro_usuario.id_otro_usuario;").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//FILTRA LOS AMIGOS DE UN USUARIO
app.post('/filtroAmigos', (req, res) => {

    dataBase.ejecutarConsulta("SELECT nombre, id_usuario, id_solicitud,foto,correo FROM (SELECT CASE WHEN id_usuario_envia = " + req.body.idValor + " THEN id_usuario_recibe ELSE id_usuario_envia END AS id_otro_usuario, id_solicitud FROM solicitudes WHERE (id_usuario_envia = " + req.body.idValor + " OR id_usuario_recibe = " + req.body.idValor + ") AND estado = 'aceptada') AS otro_usuario JOIN usuarios ON usuarios.id_usuario = otro_usuario.id_otro_usuario WHERE usuarios.nombre= '" + req.body.nombre + "';").then(resultado => {
       console.log(resultado)
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ELIMINIA UN AMIGO
app.post('/eliminarAmigos', (req, res) => {

    dataBase.ejecutarConsulta("DELETE FROM solicitudes WHERE id_solicitud =  " + req.body.id + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ELIMINA UN POST Y TODO SUS RELACIONES QUE SON LIKE Y COMENTARIOS
app.post('/eliminarPost', (req, res) => {

    dataBase.ejecutarConsulta("DELETE from likes where id_post= " + req.body.idPost + ";").then(resultado => {
        dataBase.ejecutarConsulta("DELETE from comentarios where id_post= " + req.body.idPost + ";").then(resultado => {
            dataBase.ejecutarConsulta("DELETE from posts where id_post= " + req.body.idPost + ";").then(resultado => {
            })
        })
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ACTUALIZA EL TIEMO RESTANTE QUE TIENE UN USUARIO
app.post('/actuTiempo', (req, res) => {
    console.log('esto es para ver si fdunciona el actualizar')
    if (req.body.opcion) {
        dataBase.ejecutarConsulta("select id from opciones where contraseña='" + req.body.contraseña + "' AND usuario_id=" + req.body.idValor + ";").then(resultado => {
            console.log(req.body.contraseña)
            console.log(req.body.idValor)
            if (resultado.length > 0) {
                dataBase.ejecutarConsulta("UPDATE usuarios set horaInicial=" + req.body.horaIni + ",horaFinal=" + req.body.horaSal + " WHERE id_usuario=" + req.body.idValor + ";").then(resultado2 => {
                    [{ resultado: 'actualizado' }]
                })
            }
        }).catch(error => {
            console.error('Error:', error);
            res.send('Error:', error)
                , contraseña = '" + req.body.contraseña + "'
        });
    } else {

        dataBase.ejecutarConsulta("UPDATE usuarios set horaInicial=" + req.body.horaIni + ",horaFinal=" + req.body.horaSal + " WHERE id_usuario=" + req.body.idValor + ";").then(resultado2 => {
        }).catch(error => {
            console.error('Error:', error);
            res.send('Error:', error)
        });
        console.log(req.body)
        dataBase.ejecutarConsulta("UPDATE opciones set horario=true, contraseña='" + req.body.contraseña + "' WHERE usuario_id=" + req.body.idValor + ";").then(resultado2 => {
            res.send([{ resultado: 'actualizado' }])
        }).catch(error => {
            console.error('Error:', error);
            res.send('Error:', error)
        });
    }




})

app.post('/quitarHorario', (req, res) => {

    console.log('esto es para ver si fdunciona el borrar')

    dataBase.ejecutarConsulta("select id from opciones where contraseña='" + req.body.contraseña + "' AND usuario_id=" + req.body.idValor + ";").then(resultado => {
        if (resultado.length > 0) {
            dataBase.ejecutarConsulta("UPDATE usuarios set horaInicial= -1, horaFinal=-1 WHERE id_usuario=" + req.body.idValor + ";").then(resultado2 => {

            })
            dataBase.ejecutarConsulta("UPDATE opciones set horario= false WHERE usuario_id=" + req.body.idValor + ";").then(resultado2 => {
                res.send([{ resultado: 'borrado' }])
            })
        }
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//bLOQUEA UN POST PARA UN UNICO USUARIO
app.post('/bloquearPost', (req, res) => {

    dataBase.ejecutarConsulta("INSERT INTO bloqueos (id_post, id_usuario) VALUES (" + req.body.idPost + ", " + req.body.idValor + ");").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ACTUALIZA LA SOLICUTUD DE AMISTAD, TANTO PRA SER ACEPTADA COMO PARA SER DENEGADA
app.post('/actusolicitud', (req, res) => {

    dataBase.ejecutarConsulta("UPDATE solicitudes SET estado = '" + req.body.estado + "' WHERE id_solicitud = " + req.body.idSol + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//CONSIGUE LA INFORMACON DE UN USUARIO
app.post('/informacionUsuario', (req, res) => {

    dataBase.ejecutarConsulta("Select nombre, descripcion, correo, foto from Usuarios where id_usuario=" + req.body.idValor + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//ACTUALIZA LA DESCRIPCION DE USUARIO
app.post('/editarPerfilDescripcion', (req, res) => {

    dataBase.ejecutarConsulta("UPDATE usuarios SET descripcion =  '" + req.body.contenido + "' WHERE id_usuario = " + req.body.id + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//CAMBIA LA FOTO D E PERFIL DE UN USUARIO
app.post('/editarPerfilFoto', (req, res) => {

    dataBase.ejecutarConsulta("UPDATE usuarios SET foto = '" + req.body.contenido + "' WHERE id_usuario = " + req.body.id + ";").then(resultado => {
        res.send(resultado)
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//CREA UN NUEV ACONVERSION ESTRE 2 USUARIOS
app.post('/nuevaConversacion', (req, res) => {

    dataBase.ejecutarConsulta("SELECT id_usuario FROM usuarios WHERE correo = '" + req.body.correo + "';").then(resultado => {
        if (resultado.length > 0) {
            dataBase.ejecutarConsulta("INSERT INTO chat (id_usuario_1, id_usuario_2) VALUES ('" + req.body.idValor + "', '" + resultado[0].id_usuario + "');").then(resultado2 => {
                dataBase.ejecutarConsulta("SELECT id_Chat FROM chat WHERE id_usuario_1 = '" + req.body.idValor + "' and id_usuario_2= '" + resultado[0].id_usuario + "';").then(resultado3 => {
                    res.send(resultado3)
                });
            });

        } else {

        }
    }).catch(error => {
        console.error('Error:', error);
        res.send('Error:', error)
    });
})

//LANZA EL SERVER
server.listen(puertoServer, () => {
    console.log('Server establecido en localhost ' + puertoServer)
})