const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );

    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeUsuarioPorId = async(id) => {
    const existeUser = await Usuario.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}


const existeEventoPorId = async(id) => {
    const eventoExistente = await Evento.findById(id);

    if ( !eventoExistente ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    existeEventoPorId
}