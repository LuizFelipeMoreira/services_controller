const Services = require('../models/Services');

// Create a new user
exports.createUser = async (req, res) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega } = req.body;

  res.send(`
  <h1>Nome do servico: ${nome}</h1>
  <h1>Lente: ${lente}</h1>
  <h1>Laboratorio: ${laboratorio}</h1>
  <h1>Data de ida: ${dataIda}</h1>
  <h1>Data de volta: ${dataEntrega}</h1>
  `);
};

// Edit an existing user
exports.editUser = async (req, res) => {};

// Delete a user
exports.deleteUser = async (req, res) => {};
