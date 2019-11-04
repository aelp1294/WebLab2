var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crear schema
var teamSchema = new Schema({
  id: { type: Number },
  liga: { type: String},
  nombre: { type: String},
  campeonatos: { type: Number },
  puntos: { type: Number },
  escudo: { type: String }
});

// Crear modelo para usar el schema
var Team = mongoose.model('Team', teamSchema);

module.exports = Team;