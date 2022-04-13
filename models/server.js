const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //Rutas de mi aplicaciones
        this.router();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
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