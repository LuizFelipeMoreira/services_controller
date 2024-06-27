const Services = require('../models/Services');

// Create a new user
exports.createUser = async (req, res) => {
  const { nome, lente, laboratorio, dataIda, dataEntrega, os } = req.body;

  try {
    const serviceDb = await Services.create({ nome, lente, laboratorio, os });
    console.log('chegou no try');
    res.json(serviceDb);
  } catch (error) {
    console.log('foi p catch');
    res.send(`<h1>Erro ao adicionar servico: ${error}</h1>`);
  }
};

exports.editService = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  res.send('servico com id: ' + id);
};

// exports.deleteService = async (req, res) => {
//   const id = req.params.id;

//   try {
//     await Services.destroy({
//       where: {
//         id,
//       },
//     });

//     res.send('servico com id: ' + id);
//   } catch (error) {
//     res.send(error);
//     throw new Error(error);
//   }
// };
