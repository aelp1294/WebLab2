var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// crear schema
var teamSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  liga: { type: String, required: true },
  nombre: { type: String, required: true },
  campeonatos: { type: Number, required: true },
  puntos: { type: Number, required: true },
  escudo: { type: String, required: true }
});

// Crear modelo para usar el schema
var Team = mongoose.model('Team', teamSchema);

module.exports = Team;