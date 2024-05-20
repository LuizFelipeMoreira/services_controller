const express = require('express');
const app = express();
const PORT = 8181;
const useRoutes = require('./routes/userRoutes');

// const connection = require('./config/database');
// const Services = require('./models/Services');

// (async () => {
//   try {
//     await connection.authenticate();
//     console.log('Conexao feita com sucesso !');
//   } catch (error) {
//     console.log(error);
//   }
// })();

app.use(useRoutes);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
