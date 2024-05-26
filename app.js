const express = require('express');
const app = express();
const PORT = 8181;
const useRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(useRoutes);

app.get('/', (req, res) => {
  console.log(req.body);
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
