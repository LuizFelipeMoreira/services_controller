import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { connection } from './config/database';
import { Servicos as Service } from './model/Services';
import useRoutes from './routes/serviceRoutes';

const app = express();
const PORT = 8181;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(useRoutes);

app.get('/', async (req: Request, res: Response) => {
  const services = await Service.findAll({ raw: true });
  //console.log(services);

  res.render('index', { services });
});

app.get('/services', async (req: Request, res: Response) => {
  const services = await Service.findAll({ raw: true });

  // console.log(services);

  res.status(200).json(services);
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
