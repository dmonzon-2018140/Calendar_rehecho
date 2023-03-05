const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = ( req = request, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        const usuario = Usuario.findById(uid);

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }


       req.usuario = usuario;
       next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}