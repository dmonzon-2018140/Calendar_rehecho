require('dotenv').config();

const Server = require('./models/Servidor');

const servidorIniciado = new Server();

servidorIniciado.listen();

//Si no encuentra la ruta sirve al archivo index con la original
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});