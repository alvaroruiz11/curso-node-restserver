const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicaciones
        this.router();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //middlewares es una funcion que se llamana antes de ser llamado los controladores, peticiones, etc.

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body en JSON
        this.app.use( express.json() );
        
        //directorio publico
        this.app.use( express.static('public') )

    }

    router(){

        this.app.use( this.usariosPath , require('../routes/usuarios'));
    }

    lister(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en pueto', this.port );
        });
                
    }

}

module.exports = Server;