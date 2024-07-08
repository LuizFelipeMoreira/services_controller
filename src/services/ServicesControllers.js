const express = require('express');
const router = express.Router();
const Services = require('./Services');

// Create a new user
router.post('/create', async (req, res) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;

  try {
    const serviceDb = await Services.create({ nome, lente, laboratorio, os });
    console.log('chegou no try');
    res.redirect('/');
  } catch (error) {
    console.log('foi p catch');
    res.send(`<h1>Erro ao adicionar servico: ${error}</h1>`);
  }
});

router.post('/edite', async (req, res) => {
  const id = req.params.id;

  console.log(id);

  res.send('servico com id: ' + id);
});

router.post('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Services.destroy({ where: { id } });

    res.redirect('/');
  } catch (error) {
    res.send(error);
    throw new Error(error);
  }
});

module.exports = router;
