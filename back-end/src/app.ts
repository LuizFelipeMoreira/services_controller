import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import serviceRoutes from './controllers/service/services.routes';
import authenticateRoutes from './controllers/authenticate/authenticate.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 8181;

app.use(cors());
app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(serviceRoutes);
app.use(authenticateRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
