const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  id:          { type: Number, required: true, unique: true },
  nombre:      { type: String, required: true },
  continente:  { type: String, required: true },
  tipoRegion:  { type: String, default: 'ESTADO' },
  codigoAlfa2: { type: String, required: true, maxlength: 2 },
  codigoAlfa3: { type: String, maxlength: 3 }
}, { collection: 'paises' });

module.exports = mongoose.model('Pais', paisSchema);
