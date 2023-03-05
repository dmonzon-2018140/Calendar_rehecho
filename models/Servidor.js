const express = require('express');
const { dbConection } = require('../db/config');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            events: '/api/eventos'
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        
        // Lectura y parseo del Body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.events, require('./routes/events'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
    
}

module.exports = Server;