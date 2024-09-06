const express = require('express');
const app = express();
const PORT = 8181;
const path = require('path');
const cors = require('cors');

const db = require('./database/database');
const Service = require('./services/Services');
const useRoutes = require('./services/ServicesControllers');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(useRoutes);

app.get('/', async (req, res) => {
  const services = await Service.findAll({ raw: true });
  //console.log(services);

  res.render('index', { services });
});

app.get('/services', async (req, res) => {
  const services = await Service.findAll({ raw: true });
  // console.log(services);
  res.status(200).json(services);
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
