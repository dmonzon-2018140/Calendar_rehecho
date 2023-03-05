const { response, request } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req = request, res = response) => {
    const query = { estado: true };

    const listaEventos = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
        .populate('usuario', 'name') //populate traer toda la información del usuario

    ]);

    res.json({
        msg: 'Lista de eventos',
        listaEventos
    });

}


const crearEvento = async (req = request, res = response) => {

    const {estado, start, end, usuario, ...body} = req.body;
    const eventoDB = await Evento.findOne({title: body.title});

    if (eventoDB) {
        return res.status(400).json({
            msg: `El evento ${ eventoDB.title }, ya existe en la DB`
        });
    }
    
    const data = {
        ...body,
        title: body.title.toUpperCase(),
        usuario: req.usuario._id
    }

    const evento = await Evento( data );

    await evento.save();

    res.status(201).json( evento );
}


const actualizarEvento = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...restoData } = req.body;

    if ( restoData.title ) {
        restoData.title = restoData.title.toUpperCase();
        restoData.usuario = req.usuario._id;
    }
    
    const eventoActualizado = await Evento.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: 'Evento editado',
        eventoActualizado
    })

}


const eliminarEvento = async (req = request, res = response) => {

    const {id} = req.params;

    const eventoBorrado = await Evento.findByIdAndDelete(id, { estado: false}, { new: true });

    res.json({
        msg: 'Evento Borrado',
        eventoBorrado
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
