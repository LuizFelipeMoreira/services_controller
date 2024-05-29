const express = require('express');
const app = express();
const PORT = 8181;
const useRoutes = require('./routes/userRoutes');
const Service = require('./models/Services');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(useRoutes);

app.get('/', async (req, res) => {
  const services = await Service.findAll({ raw: true });
  console.log(services);
  res.render('index', { services });
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
