import express, { Request, Response } from 'express';
import { Services } from './models/Services';
import path from 'path';
import useRoutes from './routes/userRoutes';

const app = express();
const PORT = 8181;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(useRoutes);

app.get('/', async (req: Request, res: Response) => {
  const services = await Services.findAll({ raw: true });
  console.log(services);
  res.render('index', { services });
});

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
