/*
    Rutas de usuarios / AUTH
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { loginUsuario } = require('../controllers/auth');

const router = Router();

// Rutas

router.post(
    '/', 
    [ //Middlewares
        check('correo', 'El email es obligatorio').isEmail(),
        check('password', 'Password es obligatorio y debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ]
    , loginUsuario);

module.exports = router;