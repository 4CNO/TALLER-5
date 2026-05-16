const Pais = require('../models/Pais');

const getAll = async (req, res) => {
  try {
    const paises = await Pais.find().sort({ id: 1 });
    res.json(paises);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener países', detalle: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const pais = await Pais.findOne({ id: Number(req.params.id) });
    if (!pais) return res.status(404).json({ error: 'País no encontrado' });
    res.json(pais);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar país', detalle: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = new Pais(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear país', detalle: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await Pais.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ error: 'País no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar', detalle: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const eliminado = await Pais.findOneAndDelete({ id: Number(req.params.id) });
    if (!eliminado) return res.status(404).json({ error: 'País no encontrado' });
    res.json({ message: 'País eliminado correctamente', pais: eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar', detalle: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
