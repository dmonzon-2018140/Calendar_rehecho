const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

     title: {
          type: String,
          required: true
     },
     notes: {
          type: String
     },
     start: {
          type: Date,
          required: true
     },
     end: {
          type: Date,
          required: true
     },//Usuario que define quien hizo la nota
     estado: {
          type: Boolean,
          default: true,
          required: true
     },
     usuario: {
          type: Schema.Types.ObjectId,
          ref: 'Usuario',
          required: true
     }

});

//Dejar de ver el __v y el _id
//EventoSchema.method('toJSON', function () {
//     const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
//     return object;
//})


module.exports = model('Evento', EventoSchema);