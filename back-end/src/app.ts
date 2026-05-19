import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import serviceRoutes from './modules/services/controllers/service.routes';
import authRoutes from './modules/auth/controllers/auth.routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const PORT = 8181;

app.use(cors());
app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(serviceRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Servidor iniciado com sucesso na porta ' + PORT);
});
