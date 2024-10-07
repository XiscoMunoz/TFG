const mysql = require('mysql2/promise');

const configuracion = { 
    host: 'localhost',
    user: 'root',
    port:'3306',
    password:'',
    database: 'pruebatfg',
  };

async function ejecutarConsulta(sql) {
    try {
        const conexion = await mysql.createConnection(configuracion);
        const [resultado] = await conexion.query(sql);
        await conexion.end();
        return resultado;
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        throw error; 
    }
}
module.exports = { ejecutarConsulta };


