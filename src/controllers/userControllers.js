const Services = require('../models/Services');

// Create a new user
exports.createUser = async (req, res) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;

  try {
    const serviceDb = await Services.create({ nome, lente, laboratorio, os });
    res.send(`
  <h1>Servico Criado</h1>
  <hr/>
  <h4>Nome do servico: ${nome}</h4>
  <h4>Lente: ${lente}</h4>
  <h4>Laboratorio: ${laboratorio}</h4>
  <h4>Os: ${os}</h4>
  <h4>Data de ida: ${dataIda}</h4>
  <h4>Data de volta: ${dataEntrega}</h4>
  `);
  } catch (error) {
    res.send(`<h1>Erro ao adicionar servico:<h1/>
    <p>${error}</p>`);
  }
};

// Edit an existing user
exports.editUser = async (req, res) => {};

// Delete a user
exports.deleteUser = async (req, res) => {};
